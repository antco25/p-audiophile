import React, { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCard, getBannerProps, InfoBannerCard, ProductCard, RecommendCard } from '../../components';
import { client, formatCategories, formatProduct, formatRecommendations, Product, Recommendation } from '../../lib';
import { CommonPageProps } from '..';
import { useStateContext } from '../../context/ContextWrap';
import { useRouter } from 'next/router';
import commonStyles from '../../components/common.module.scss';

interface ProductDetailProps extends CommonPageProps {
  product: Product,
  recommendations: Recommendation[],
  InfoData: BannerProps
}

//TODO: Handle imagesize in media query
//TODO: Problems with image stretching in gallery
const ProductDetail = ({ categories, product, recommendations, InfoData }: ProductDetailProps) => {
  const router = useRouter();
  const { getPrevLink, consumePrevLink, storeLink } = useStateContext();
  const imageSize = 0;

  useEffect(() => {
    storeLink(router.asPath);
  }, [router.asPath])

  return (
    <div className={commonStyles.appWrap}>
      <Link href={getPrevLink()} onClick={consumePrevLink} className='inline-block mt-20 mb-14 font-medium opacity-50 hover:underline'>Go back</Link>
      <ProductCard data={product} className='mb-[160px]' />
      <div className='flex mb-[160px]'>
        <div className='max-w-[650px]'>
          <h1 className='uppercase font-bold text-3xl mb-8'>Features</h1>
          {
            product.features.split('\n').map((s, index, arr) => {
              return <p key={index} className={`opacity-50 font-medium${arr.length - 1 === index ? '' : ' mb-4'}`}>{s}</p>
            })
          }
        </div>
        <div className='ml-[125px]'>
          <h1 className='uppercase font-bold text-3xl mb-8'>In the box</h1>
          <ul>
            {product.boxItems.map((item, index) => {
              return (
                <li key={index}>
                  <span className='text-orange-600 mr-6'>{item.quantity}x</span>
                  <span className='opacity-50 font-medium'>{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='flex gap-x-[20px] mb-[160px]'>
        <div className='flex flex-col gap-y-8'>
          <Image className='rounded-lg' src={product.gallerySmallOne[imageSize]} width={500} height={500} alt='Gallery small top' />
          <Image className='rounded-lg' src={product.gallerySmallTwo[imageSize]} width={500} height={500} alt='Gallery small bottom' />
        </div>
        <div>
          <Image className='rounded-lg h-full' src={product.galleryLarge[imageSize]} width={500} height={500} alt='Gallery large' />
        </div>
      </div>
      <div className='flex gap-x-[25px] mb-[160px]'>
        {
          recommendations.map((r, index) => {
            return <RecommendCard key={index} data={r} />
          })
        }
      </div>
      <div className='flex gap-x-8 h-72 mb-[160px]'>
        {
          categories.map((category, index) => {
            return <CategoryCard key={index} category={category.name} thumbnail={category.image} className='flex-1' />
          })
        }
      </div>
      <InfoBannerCard className='mb-[160px]' data={InfoData.data} />
    </div>
  )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (context) => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  const urlProduct = context.params?.id as string || '';
  const productQuery = `*[_type == "product" && slug.current == "${urlProduct}"][0] { ..., category->{name, _id} }`;
  const productResult = await client.fetch(productQuery)
  const product = formatProduct(productResult);

  const recommendationQueryOne = `*[_type == "product" && category._ref =="${productResult.category._id}" && slug.current != "${urlProduct}"][0..1] | 
                                { name, slug, recommendImage }`;
  const recommendationQueryTwo = `*[_type == "product" && category._ref !="${productResult.category._id}" && slug.current != "${urlProduct}"][0..2] | 
                                { name, slug, recommendImage }`;
  const recommendations = formatRecommendations([...await client.fetch(recommendationQueryOne), ...await client.fetch(recommendationQueryTwo)].slice(0, 3));

  const infoQuery = `*[_type == "banner" && name == "Info"][0] | { ..., product->{slug} }`;
  const InfoData = getBannerProps(await client.fetch(infoQuery))

  return {
    props: { categories, product, recommendations, InfoData }
  }
}
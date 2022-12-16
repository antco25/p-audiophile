import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCards, getBannerProps, InfoBannerCard, ProductCard, RecommendCard } from '../../components';
import { client, formatCategories, formatProduct, formatRecommendations, Product, Recommendation } from '../../lib';
import { CommonPageProps } from '..';
import { useStateContext } from '../../context/ContextWrap';
import { useRouter } from 'next/router';
import commonStyles from '../../components/common.module.scss';
import { useMediaQuery } from 'react-responsive';
import { ScreenSize } from '../_app';

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

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isLargeTablet = useMediaQuery({ minWidth: 576 })
  const isTablet = useMediaQuery({ minWidth: 376 })
  const screenSizeA = (isDesktop ? ScreenSize.DESKTOP : isTablet ? ScreenSize.TABLET : ScreenSize.MOBILE);
  const screenSizeB = (isDesktop ? ScreenSize.DESKTOP : isLargeTablet ? ScreenSize.TABLET : ScreenSize.MOBILE);

  useEffect(() => {
    setLoaded(true)
  })

  useEffect(() => {
    storeLink(router.asPath);
  }, [router.asPath])

  return (
    <div className={commonStyles.appWrap}>
      <Link href={getPrevLink()} onClick={consumePrevLink}
        className='inline-block mt-4 xsm:mt-8 lg:mt-20 mb-6 lg:mb-14 text-base opacity-50 hover:underline'>Go back</Link>
      <ProductCard data={product} className='xsm:mb-[120px] lg:mb-[160px]' />


      <div className='flex justify-between flex-col lg:flex-row gap-[88px] xsm:gap-[120px] lg:gap-0 mb-[88px] xsm:mb-[120px] lg:mb-[160px]'>
        <div className='lg:w-[650px]'>
          <h1 className={`${commonStyles.headerFour} mb-6 xsm:mb-8`}>Features</h1>
          {
            product.features.split('\n').map((s, index, arr) => {
              return <p key={index} className={`opacity-50 text-base${arr.length - 1 === index ? '' : ' mb-[25px]'}`}>{s}</p>
            })
          }
        </div>
        <div className='flex flex-col xsm:flex-row lg:flex-col lg:w-[250px] min-[1160px]:w-[350px]'>
          <h1 className={`${commonStyles.headerFour} w-[250px] sm:w-[350px] lg:w-auto mb-6 xsm:mb-0 lg:mb-8`}>In the box</h1>
          <ul>
            {product.boxItems.map((item, index, arr) => {
              return (
                <li key={index} className={index + 1 == arr.length ? '' : 'mb-2'}>
                  <span className='text-pOrange-200 text-base font-bold mr-6'>{item.quantity}x</span>
                  <span className='opacity-50 text-base'>{item.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>


      {
        loaded &&
        <div className='flex flex-col xsm:flex-row gap-5 xsm:gap-[18px] lg:gap-[30px] mb-[120px] lg:mb-[160px]'>
          <div className='flex flex-col gap-5 lg:gap-8 xsm:w-[40%] lg:w-auto'>
            <img className='object-cover rounded-lg h-[174px] lg:h-[280px] '
              src={product.gallerySmallOne[screenSizeB]} alt='Gallery small top' />
            <img className='object-cover rounded-lg h-[174px] lg:h-[280px]'
              src={product.gallerySmallTwo[screenSizeB]} alt='Gallery small bottom' />
          </div>
          <div className='flex-1 lg:flex-auto'>
            <img className='object-cover rounded-lg w-full h-[368px] lg:h-[592px]'
              src={product.galleryLarge[screenSizeB]} alt='Gallery large' />
          </div>
        </div>
      }
      <div className={`${commonStyles.headerFour} text-center mb-10 xsm:mb-14 lg:mb-16`}>You may also like</div>
      <div className='flex flex-col xsm:flex-row gap-14 xsm:gap-[10px] lg:gap-[30px] mb-[120px] lg:mb-[160px]'>
        {
          loaded &&
          recommendations.map((r, index) => {
            return <RecommendCard className='flex-1' key={index} data={r} screenSize={screenSizeB} />
          })
        }
      </div>
      <CategoryCards categories={categories} className='mb-[120px] lg:mb-[160px]' />
      <InfoBannerCard className='mb-[120px] lg:mb-[160px]' data={InfoData.data} />
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
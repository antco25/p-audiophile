import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { CategoryCard, getBannerProps, InfoBannerCard, ProductCard, RecommendCard } from '../../components';
import { client, formatCategories } from '../../lib';
import { CommonPageProps } from '..';
import commonStyles from '../../components/common.module.scss';

//TODO: Get from db
import tbXX99 from '../../public/assets/shared/desktop/image-xx99-mark-two-headphones.jpg'
import tbXX59 from '../../public/assets/shared/desktop/image-xx59-headphones.jpg'
import tbZX9 from '../../public/assets/shared/desktop/image-zx9-speaker.jpg'
import productData from '../../data/productData';

const ProductDetail = ({ categories, InfoData }: CommonPageProps) => {
  return (
    <div className={commonStyles.appWrap}>
      <Link href='/' className='block mt-20 mb-14 font-medium opacity-50'>Go back</Link>
      <ProductCard data={productData} className='mb-[160px]' />
      <div className='flex mb-[160px]'>
        <div className='max-w-[650px]'>
          <h1 className='uppercase font-bold text-3xl mb-8'>Features</h1>
          {
            productData.features.split('\n').map((s, index, arr) => {
              return <p key={index} className={`opacity-50 font-medium${arr.length - 1 === index ? '' : ' mb-4'}`}>{s}</p>
            })
          }
        </div>
        <div className='ml-[125px]'>
          <h1 className='uppercase font-bold text-3xl mb-8'>In the box</h1>
          <ul>
            {productData.boxItems.map((item, index) => {
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
          <Image className='rounded-lg' src={productData.galleryOne} alt='Gallery small top' />
          <Image className='rounded-lg' src={productData.galleryTwo} alt='Gallery small bottom' />
        </div>
        <div>
          <Image className='rounded-lg h-full' src={productData.galleryLarge} alt='Gallery large' />
        </div>
      </div>
      <div className='flex gap-x-[25px] mb-[160px]'>
        <RecommendCard productData={{ name: 'XX99 Mark II', thumbnail: tbXX99 }} />
        <RecommendCard productData={{ name: 'XX59', thumbnail: tbXX59 }} />
        <RecommendCard productData={{ name: 'ZX9 Speaker', thumbnail: tbZX9 }} />
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

export const getServerSideProps: GetServerSideProps<CommonPageProps> = async () => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  const query = `*[_type == "banner" && name == "Info"] | { ..., product->{slug} }`;
  const results = await client.fetch(query);

  const InfoData = getBannerProps(results[0])

  return {
    props: { categories, InfoData }
  }
}
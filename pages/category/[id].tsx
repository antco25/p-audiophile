import React from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next';
import { CategoryCard, getBannerProps, InfoBannerCard, ProductCategoryCard } from '../../components';
import { client, formatCategories } from '../../lib';
import { CommonPageProps } from '..';
import commonStyles from '../../components/common.module.scss';

//TODO: Get from db
import categoryData from '../../data/categoryData';

const CategoryDetails = ({ categories, InfoData }: CommonPageProps) => {
  const router = useRouter()
  const { id } = router.query;

  return (
    <div>
      <div className='bg-black mb-[160px] '>
        <hr className={`${commonStyles.appWrap} border-white opacity-20`} />
        <div className='text-white py-24 uppercase text-center font-bold text-4xl'>{id}</div>
      </div>
      <div className={commonStyles.appWrap}>
        {
          categoryData.headphones.products.map((product, index) => {
            return <ProductCategoryCard key={index} data={product} category='headphones' className='mb-[160px]' reverse={index % 2 !== 0} />
          })
        }
        <div className='flex gap-x-8 h-72 mb-[160px]'>
          {
            categories.map((category, index) => {
              return <CategoryCard key={index} category={category.name} thumbnail={category.image} className='flex-1' />
            })
          }
        </div>
        <InfoBannerCard className='mb-[160px]' data={InfoData.data} />
      </div>
    </div>
  )
}

export default CategoryDetails

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
import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCard, getBannerProps, InfoBannerCard, ProductCategoryCard } from '../../components';
import { CategoryProduct, client, formatCategories, formatCategoryProducts } from '../../lib';
import { CommonPageProps } from '..';
import { useStateContext } from '../../context/ContextWrap';
import commonStyles from '../../components/common.module.scss';

interface CategoryDetailProps extends CommonPageProps {
  category: string,
  categoryProducts: CategoryProduct[]
  InfoData: BannerProps
}

const CategoryDetails = ({ category, categories, categoryProducts, InfoData }: CategoryDetailProps) => {
  const { storeLink } = useStateContext();

  useEffect(() => {
    storeLink(`/category/${category}`, true)
  }, [])

  return (
    <div>
      <div className='bg-black mb-[160px] '>
        <hr className={`${commonStyles.appWrap} border-white opacity-20`} />
        <div className='text-white py-24 uppercase text-center font-bold text-4xl'>{category}</div>
      </div>
      <div className={commonStyles.appWrap}>
        {
          categoryProducts.map((product, index) => {
            return <ProductCategoryCard key={index} data={product} className='mb-[160px]' reverse={index % 2 !== 0} />
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

//TODO: Error handling
export const getServerSideProps: GetServerSideProps<CategoryDetailProps> = async (context) => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  const category = context.params?.id as string || '';
  const urlCategory = categories.find(el => el.name.toLowerCase() === category);
  const categoryProductsQuery = `*[_type == "product" && category._ref == "${urlCategory?.id}"] | order(name desc)`;
  const categoryProducts = formatCategoryProducts(await client.fetch(categoryProductsQuery), urlCategory?.name.toLowerCase() || '');

  const infoQuery = `*[_type == "banner" && name == "Info"][0] | { ..., product->{slug} }`;
  const InfoData = getBannerProps(await client.fetch(infoQuery))

  return {
    props: { category, categories, categoryProducts, InfoData }
  }
}
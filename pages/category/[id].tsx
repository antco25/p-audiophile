import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCards, getBannerProps, InfoBannerCard, ProductCategoryCard } from '../../components';
import { CategoryProduct, client, formatCategories, formatCategoryProducts } from '../../lib';
import { CommonPageProps } from '..';
import { useStateContext } from '../../context/ContextWrap';
import common from '../../components/common.module.scss';

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
      <div className='bg-black mb-[64px] xsm:mb-[120px] lg:mb-[160px] '>
        <hr className={`${common.appWrap} border-white opacity-20`} />
        <div className={`${common.headerOne} h-[101px] xsm:h-[246px] lg:h-[239px] p-8 xsm:pt-[105px] lg:pt-24 text-white text-center`}>{category}</div>
      </div>
      <div className={common.appWrap}>
        {
          categoryProducts.map((product, index) => {
            return <ProductCategoryCard key={index} data={product} className='mb-[120px] lg:mb-[160px]' reverse={index % 2 !== 0} />
          })
        }
        <CategoryCards categories={categories} className='mb-[120px] lg:mb-[160px]' />
        <InfoBannerCard className='mb-[120px] lg:mb-[160px]' data={InfoData.data} />
      </div>
    </div>
  )
}

export default CategoryDetails

export const getServerSideProps: GetServerSideProps<CategoryDetailProps> = async (context) => {
  try {
    const categoryQuery = `*[_type == "category"] | order(order)`;
    const categories = formatCategories(await client.fetch(categoryQuery));

    const category = context.params?.id as string || '';
    const urlCategory = categories.find(el => el.name.toLowerCase() === category);
    const categoryProductsQuery = `*[_type == "product" && category._ref == "${urlCategory?.id}"] | order(name desc)`;
    const categoryProducts = formatCategoryProducts(await client.fetch(categoryProductsQuery), urlCategory?.name.toLowerCase() || '');

    const infoQuery = `*[_type == "banner" && name == "Info"][0] | { ..., product->{slug} }`;
    const InfoData = getBannerProps(await client.fetch(infoQuery))

    const currentRoute = categoryProducts[0].category.charAt(0).toUpperCase() + categoryProducts[0].category.slice(1);

    return {
      props: { category, categories, categoryProducts, InfoData, currentRoute }
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
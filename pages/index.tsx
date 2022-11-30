import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCard, getBannerProps, HomeHeroBanner, InfoBannerCard, YX1BannerCard, ZX7BannerCard, ZX9BannerCard } from '../components';
import { Categories, client, formatCategories } from '../lib';
import { useStateContext } from '../context/ContextWrap';
import common from '../components/common.module.scss';

export interface CommonPageProps {
  categories: Categories[],
}

interface HomeProps extends CommonPageProps {
  XX99IIData: BannerProps,
  ZX9Data: BannerProps,
  ZX7Data: BannerProps,
  YX1Data: BannerProps,
  InfoData: BannerProps
}

const Home = ({ categories, XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData }: HomeProps) => {
  const { storeLink } = useStateContext();

  useEffect(() => {
    storeLink('/', true)
  }, [])

  return (
    <div className={common.appWrap}>
      <HomeHeroBanner data={XX99IIData.data} />
      <div className='flex gap-x-8 h-72 mt-28'>
        {
          categories.map((category, index) => {
            return <CategoryCard key={index} category={category.name} thumbnail={category.image} className='flex-1' />
          })
        }
      </div>
      <ZX9BannerCard className='mt-40' data={ZX9Data.data} />
      <ZX7BannerCard className='mt-12' data={ZX7Data.data} />
      <YX1BannerCard className='mt-12' data={YX1Data.data} />
      <InfoBannerCard className='my-48' data={InfoData.data} />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  const query = `*[_type == "banner"] | order(name) { ..., product->{slug} }`;
  const results = await client.fetch(query);

  const InfoData = getBannerProps(results[0])
  const XX99IIData = getBannerProps(results[1])
  const YX1Data = getBannerProps(results[2])
  const ZX7Data = getBannerProps(results[3])
  const ZX9Data = getBannerProps(results[4])

  return {
    props: { categories, XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData }
  }
}


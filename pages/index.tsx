import React from 'react';
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCard, getBannerProps, HomeHeroBanner, InfoBannerCard, YX1BannerCard, ZX7BannerCard, ZX9BannerCard } from '../components';
import { client } from '../lib/sanityClient';
import common from '../components/common.module.scss';

//TODO: Get from db
import tbHeadphones from '../public/assets/shared/desktop/image-category-thumbnail-headphones.png'
import tbSpeakers from '../public/assets/shared/desktop/image-category-thumbnail-speakers.png'
import tbEarphones from '../public/assets/shared/desktop/image-category-thumbnail-earphones.png'


interface HomeProps {
  XX99IIData : BannerProps,
  ZX9Data: BannerProps,
  ZX7Data: BannerProps,
  YX1Data: BannerProps,
  InfoData: BannerProps
}

const Home = ({ XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData }: HomeProps) => {
  return (
    <div className={common.appWrap}>
      <HomeHeroBanner data={XX99IIData.data}/>
      <div className='flex gap-x-8 h-72 mt-28'>
        <CategoryCard category='headphones' thumbnail={tbHeadphones} className='flex-1' />
        <CategoryCard category='speakers' thumbnail={tbSpeakers} className='flex-1' />
        <CategoryCard category='earphones' thumbnail={tbEarphones} className='flex-1' />
      </div>
      <ZX9BannerCard className='mt-40' data={ZX9Data.data}/>
      <ZX7BannerCard className='mt-12' data={ZX7Data.data} />
      <YX1BannerCard className='mt-12' data={YX1Data.data} />
      <InfoBannerCard className='my-48' data={InfoData.data}/>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  const query = `*[_type == "banner"] | order(name) { ..., product->{slug} }`;
  const results = await client.fetch(query);

  const InfoData = getBannerProps(results[0])
  const XX99IIData = getBannerProps(results[1])
  const YX1Data = getBannerProps(results[2])
  const ZX7Data = getBannerProps(results[3])
  const ZX9Data = getBannerProps(results[4])

  return {
    props: { XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData }
  }
}


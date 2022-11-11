import React from 'react';
import { CategoryCard, HomeHeroBanner, ZX7BannerCard, ZX9BannerCard } from '../components';
import common from '../components/common.module.scss';

//TODO: Get from db
import tbHeadphones from '../public/assets/shared/desktop/image-category-thumbnail-headphones.png'
import tbSpeakers from '../public/assets/shared/desktop/image-category-thumbnail-speakers.png'
import tbEarphones from '../public/assets/shared/desktop/image-category-thumbnail-earphones.png'
import { InfoBannerCard, YX1BannerCard } from '../components/BannerCard';

const Home = () => {
  return (
    <div className={common.appWrap}>
      <HomeHeroBanner />
      <div className='flex gap-x-8 h-72 mt-28'>
        <CategoryCard category='headphones' thumbnail={tbHeadphones} className='flex-1' />
        <CategoryCard category='speakers' thumbnail={tbSpeakers} className='flex-1' />
        <CategoryCard category='earphones' thumbnail={tbEarphones} className='flex-1' />
      </div>
      <ZX9BannerCard className='mt-40' />
      <ZX7BannerCard className='mt-12' />
      <YX1BannerCard className='mt-12' />
      <InfoBannerCard className='my-48' />
    </div>
  )
}

export default Home
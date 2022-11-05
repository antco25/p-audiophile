import React from 'react';
import { CategoryCard } from '../components';
import common from '../components/common.module.scss';

//TODO: Get from db
import tbHeadphones from '../public/assets/shared/desktop/image-category-thumbnail-headphones.png'
import tbSpeakers from '../public/assets/shared/desktop/image-category-thumbnail-speakers.png'
import tbEarphones from '../public/assets/shared/desktop/image-category-thumbnail-earphones.png'

const Home = () => {
  return (
    <div className={common.appWrap}>
      <div className='flex gap-x-8 h-72 mt-32'>
        <CategoryCard category='headphones' thumbnail={tbHeadphones} className='flex-1' />
        <CategoryCard category='speakers' thumbnail={tbSpeakers} className='flex-1' />
        <CategoryCard category='earphones' thumbnail={tbEarphones} className='flex-1' />
      </div>
    </div>
  )
}

export default Home
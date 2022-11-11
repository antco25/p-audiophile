import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { CategoryCard, InfoBannerCard, ProductCategoryCard } from '../../components';
import commonStyles from '../../components/common.module.scss';

//TODO: Get from db
import tbHeadphones from '../../public/assets/shared/desktop/image-category-thumbnail-headphones.png'
import tbSpeakers from '../../public/assets/shared/desktop/image-category-thumbnail-speakers.png'
import tbEarphones from '../../public/assets/shared/desktop/image-category-thumbnail-earphones.png'
import categoryData from '../../data/categoryData';


const CategoryDetails = () => {
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
          <CategoryCard category='headphones' thumbnail={tbHeadphones} className='flex-1' />
          <CategoryCard category='speakers' thumbnail={tbSpeakers} className='flex-1' />
          <CategoryCard category='earphones' thumbnail={tbEarphones} className='flex-1' />
        </div>
        <InfoBannerCard className='mb-[160px]' />
      </div>
    </div>
  )
}

export default CategoryDetails
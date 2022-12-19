import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import { ScreenSize } from '../../pages/_app';
import { BannerProps } from '../BannerCard';
import common from '../common.module.scss';

const HomeHeroBanner = ({ data, screenSize, loaded, ...props }: BannerProps) => {

  const header = getRichText(data.header);
  const description = getRichText(data.description);
  const image = screenSize === ScreenSize.DESKTOP ? data.imageDesktop : screenSize === ScreenSize.TABLET ? data.imageTablet : data.imageMobile

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white flex h-[509px] xs:h-[638px] lg:h-[632px]`}>
      <div className='flex-1'>
        <div className={`flex flex-col h-full justify-center items-center lg:items-start 
        w-80 xsm:w-96 lg:w-auto mx-auto lg:mx-0 text-center lg:text-left`}>
          <p className={`${common.headerThree} opacity-50 mb-4 xsm:mb-6`}>New Product</p>
          <h1 className='uppercase font-bold text-[2.25rem] xsm:text-[3.5rem] leading-10 xsm:leading-[3.625rem] mb-6'>{header}</h1>
          <p className='text-base max-w-[350px] opacity-75 mb-7 xsm:mb-10 '>{description}</p>
          <Link href={`/products/${data.productSlug}`} className={common.buttonLinkOne}>See Product</Link>
        </div>
      </div>
      <div className='flex-0 lg:flex-1'>
        {
          loaded &&
          <img src={image}
            alt='Product Banner' className='absolute object-cover left-1/2 -translate-x-2/4 top-0 h-[600px] xs:h-[729px] -z-10' />
        }
        <div className='absolute bg-[#191919] w-full left-0 top-0 h-[600px] xs:h-[729px] -z-20' />
      </div>
    </div>
  )
}

export default HomeHeroBanner
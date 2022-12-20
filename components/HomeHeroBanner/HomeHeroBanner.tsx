import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from '../BannerCard/BannerProps';
import common from '../common.module.scss';

const HomeHeroBanner = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);
  const description = getRichText(data.description);

  return (
    <Link className={`${props.className ? props.className + ' ' : ''}text-white flex h-[509px] xs:h-[638px] lg:h-[632px]`}
      href={`/products/${data.productSlug}`}>
      <div className='flex-1'>
        <div className={`flex flex-col h-full justify-center items-center lg:items-start 
        w-80 xsm:w-96 lg:w-auto mx-auto lg:mx-0 text-center lg:text-left`}>
          <p className={`${common.headerThree} opacity-50 mb-4 xsm:mb-6`}>New Product</p>
          <h1 className='uppercase font-bold text-[2.25rem] xsm:text-[3.5rem] leading-10 xsm:leading-[3.625rem] mb-6'>{header}</h1>
          <p className='text-base max-w-[350px] opacity-75 mb-7 xsm:mb-10 '>{description}</p>
          <button className={common.buttonLinkOne}>See Product</button>
        </div>
      </div>
      <div className='flex-0 lg:flex-1'>
        <div className='absolute left-1/2 -translate-x-2/4 top-0 w-full -z-10'>
          <img src={data.imageDesktop} alt='Product Banner' className='object-cover h-[600px] xs:h-[729px] mx-auto hidden lg:block' />
          <img src={data.imageTablet} alt='Product Banner' className='object-cover h-[600px] xs:h-[729px] mx-auto hidden xs:block lg:hidden' />
          <img src={data.imageMobile} alt='Product Banner' className='object-cover h-[600px] xs:h-[729px] mx-auto block xs:hidden' />
        </div>
        <div className='absolute bg-[#191919] w-full left-0 top-0 h-[600px] xs:h-[729px] -z-20' />
      </div>
    </Link>
  )
}

export default HomeHeroBanner
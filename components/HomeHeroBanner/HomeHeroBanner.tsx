import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { getRichText } from '../../lib';
import { BannerProps } from '../BannerCard';
import commonStyles from '../common.module.scss';

//TODO: Fix after responsive navbar
const HomeHeroBanner = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);
  const description = getRichText(data.description);

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 376 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white flex h-[510px] xs:h-[640px] lg:h-[632px]`}>
      <div className='flex-1'>
        <div className={`flex flex-col h-full justify-center items-center lg:items-start 
        w-80 xsm:w-96 lg:w-auto mx-auto lg:mx-0 text-center lg:text-left`}>
          <p className={`${commonStyles.headerThree} opacity-50 mb-4 xsm:mb-6`}>New Product</p>
          <h1 className='uppercase font-bold text-[2.25rem] xsm:text-[3.5rem] leading-10 xsm:leading-[3.625rem] mb-6'>{header}</h1>
          <p className='text-base max-w-[350px] opacity-75 mb-7 xsm:mb-10 '>{description}</p>
          <Link href={`/products/${data.productSlug}`} className={commonStyles.buttonLinkOne}>See Product</Link>
        </div>
      </div>
      <div className='flex-0 lg:flex-1'>
        {
          !loaded ? null :
            <img src={isDesktop ? data.imageDesktop : isTablet ? data.imageTablet : data.imageMobile}
              alt='Product Banner' className='absolute object-cover left-1/2 -translate-x-2/4 top-0 h-[600px] xs:h-[729px] -z-10' />
        }
        <div className='absolute bg-[#181818] w-full left-0 top-0 h-[600px] xs:h-[729px] -z-20' />
      </div>
    </div>
  )
}

export default HomeHeroBanner
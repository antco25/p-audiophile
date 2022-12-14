import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const YX1BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  return (
    <Link href={`/products/${data.productSlug}`}
      className={`${props.className ? props.className + ' ' : ''}text-black group flex flex-col xsm:h-[320px] xsm:flex-row gap-6 xsm:gap-3 lg:gap-[30px]`}>
      <div className='flex-1 overflow-hidden rounded-lg'>
        <img src={data.imageDesktop} alt='Product Banner' className='w-full h-[200px] xsm:h-full object-cover group-hover:scale-102 transition-transform hidden lg:block' />
        <img src={data.imageTablet} alt='Product Banner' className='w-full h-[200px] xsm:h-full object-cover group-hover:scale-102 transition-transform hidden xs:block lg:hidden' />
        <img src={data.imageMobile} alt='Product Banner' className='w-full h-[200px] xsm:h-full object-cover group-hover:scale-102 transition-transform block xs:hidden' />
      </div>
      <div className='flex-1'>
        <div className='flex flex-col justify-center items-start bg-pLight-200 rounded-lg h-full py-10 sm:py-[100px] px-6 xs:px-10 lg:px-24'>
          <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
          <button className={`${common.buttonLinkTwo}`}>See Product</button>
        </div>
      </div>
    </Link>
  )
}

export default YX1BannerCard
import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const ZX7BannerCard = ({ data, ...props }: BannerProps) => {
  const header = getRichText(data.header);

  return (
    <Link href={`/products/${data.productSlug}`}
      className={`${props.className ? props.className + ' ' : ''}block text-black h-80 group relative`}>
      <div className='flex flex-col justify-center items-start h-full ml-6 xs:ml-12 xsm:ml-24 lg:ml-32 '>
        <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
        <button className={`${common.buttonLinkTwo}`}>See Product</button>
      </div>
      <div className='absolute top-0 block w-full h-full -z-10 rounded-lg overflow-hidden'>
        <img src={data.imageDesktop} alt='Product Banner' className='object-cover w-full h-full group-hover:scale-102 transition-transform hidden lg:block' />
        <img src={data.imageTablet} alt='Product Banner' className='object-cover w-full h-full group-hover:scale-102 transition-transform hidden xsm:block lg:hidden' />
        <img src={data.imageMobile} alt='Product Banner' className='object-cover w-full h-full group-hover:scale-102 transition-transform block xsm:hidden' />
      </div>

    </Link>
  )
}

export default ZX7BannerCard
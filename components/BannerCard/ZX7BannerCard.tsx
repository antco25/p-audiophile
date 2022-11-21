import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib/utils';
import BannerProps from './BannerProps';

const ZX7BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80 rounded-lg bg-cover`} style={{ backgroundImage: `url(${data.imageDesktop})` }} >
      <div className='flex flex-col justify-center items-start ml-32 h-full'>
        <h1 className='uppercase text-3xl font-bold mb-8'>{header}</h1>
        <Link href={`/products/${data.productSlug}`} className='uppercase font-bold border border-black hover:bg-black hover:text-white py-4 px-7 text-sm'>See Product</Link>
      </div>
    </div>
  )
}


export default ZX7BannerCard
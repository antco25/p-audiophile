import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib/utils';
import BannerProps from './BannerProps';

const YX1BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80  flex gap-8`}>
      <div className='flex-1'>
        <Image src={data.imageDesktop} width={540} height={320} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-start bg-slate-100 rounded-lg'>
        <h1 className='uppercase text-3xl font-bold mb-8 ml-24'>{header}</h1>
        <Link href={`/products/${data.productSlug}`} className='uppercase font-bold border border-black hover:bg-black hover:text-white py-4 px-7 text-sm ml-24'>See Product</Link>
      </div>
    </div>
  )
}

export default YX1BannerCard
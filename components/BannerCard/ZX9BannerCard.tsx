import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PatternCircles } from '../Icons';
import { getRichText } from '../../lib/utils';
import BannerProps from './BannerProps';

//TODO: Fix the highlighting of the text, z-index
const ZX9BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);
  const description = getRichText(data.description);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white h-[35rem]`}>
      <div className='bg-orange-400 h-full overflow-hidden rounded-lg flex relative'>
        <PatternCircles className='absolute -left-[96px] -top-[36px]' />
        <div className='relative flex-1'>
          <Image src={data.imageDesktop} width={756} height={918} alt='Product Banner' className='absolute -bottom-2 left-[192px] w-[23rem] ' />
        </div>
        <div className='flex-1 flex flex-col justify-center items-start ml-52'>
          <h1 className='uppercase text-6xl font-bold mb-6'>{header}</h1>
          <p className='text-sm font-medium max-w-xs mb-10'>{description}</p>
          <Link href={`/products/${data.productSlug}`} className='uppercase font-bold bg-black hover:bg-slate-800 py-4 px-7 text-sm z-10'>See Product</Link>
        </div>
      </div>
    </div>
  )
}

export default ZX9BannerCard
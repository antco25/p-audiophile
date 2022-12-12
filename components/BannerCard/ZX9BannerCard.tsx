import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PatternCircles } from '../Icons';
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const ZX9BannerCard = ({ data, ...props }: BannerProps) => {
  const header = getRichText(data.header);
  const description = getRichText(data.description);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white h-[35rem]`}>
      <div className='bg-pOrange-200 h-full overflow-hidden rounded-lg flex flex-col lg:flex-row relative'>
        <PatternCircles className='absolute -left-[96px] -top-[36px]' />
        <div className='relative flex-1'>
          <Image src={data.imageDesktop} width={756} height={918} alt='Product Banner' className='absolute -bottom-2 left-[192px] w-[23rem] ' />
        </div>
        <div className='flex-1 flex flex-col justify-center z-10 items-center lg:items-start lg:ml-52 text-center lg:text-left '>
          <h1 className='uppercase font-bold text-[2.25rem] leading-10 xsm:text-[3.5rem] xsm:leading-[3.625rem] mb-6'>{header}</h1>
          <p className='text-base max-w-xs mb-10'>{description}</p>
          <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkThree}`}>See Product</Link>
        </div>
      </div>
    </div>
  )
}

export default ZX9BannerCard
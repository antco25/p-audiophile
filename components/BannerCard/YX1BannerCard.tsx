import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

//TODO: Picture responsive
const YX1BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black flex flex-col xsm:flex-row gap-3 lg:gap-[30px]`}>
      <div className='flex-1'>
        <Image src={data.imageDesktop} width={540} height={320} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='flex-1'>
        <div className='flex flex-col justify-center items-start bg-pLight-200 rounded-lg h-full py-10 sm:py-[100px] px-6 xs:px-10 lg:px-24'>
          <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
          <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkTwo}`}>See Product</Link>
        </div>
      </div>
    </div>
  )
}

export default YX1BannerCard
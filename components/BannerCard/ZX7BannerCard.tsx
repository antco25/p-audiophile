import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

//TODO: Picture responsive
const ZX7BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80 rounded-lg bg-cover`}
      style={{ backgroundImage: `url(${data.imageDesktop})` }} >
      <div className='flex flex-col justify-center items-start h-full ml-6 xs:ml-12 xsm:ml-24 lg:ml-32 '>
        <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
        <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkTwo}`}>See Product</Link>
      </div>
    </div>
  )
}


export default ZX7BannerCard
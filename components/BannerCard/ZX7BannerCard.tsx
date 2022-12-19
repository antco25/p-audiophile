import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import { ScreenSize } from '../../pages/_app';
import common from '../common.module.scss';

const ZX7BannerCard = ({ data, screenSize, loaded, ...props }: BannerProps) => {
  const header = getRichText(data.header);
  const image = screenSize === ScreenSize.DESKTOP ? data.imageDesktop : screenSize === ScreenSize.TABLET ? data.imageTablet : data.imageMobile

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80 relative`}>
      <div className='flex flex-col justify-center items-start h-full ml-6 xs:ml-12 xsm:ml-24 lg:ml-32 '>
        <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
        <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkTwo}`}>See Product</Link>
      </div>
      {
        loaded &&
        <img src={image}
          alt='Product Banner' className='absolute top-0 block w-full h-full object-cover rounded-lg -z-10' />
      }

    </div>
  )
}

export default ZX7BannerCard
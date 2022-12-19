import Link from 'next/link';
import React from 'react'
import { getRichText } from '../../lib';
import { BannerPageProps } from './BannerProps';
import { ScreenSize } from '../../pages/_app';
import common from '../common.module.scss';

const ZX7BannerCard = ({ data, screenSize, loaded, ...props }: BannerPageProps) => {
  const header = getRichText(data.header);
  const image = screenSize === ScreenSize.DESKTOP ? data.imageDesktop : screenSize === ScreenSize.TABLET ? data.imageTablet : data.imageMobile

  return (
    <Link href={`/products/${data.productSlug}`}
      className={`${props.className ? props.className + ' ' : ''}block text-black h-80 group relative`}>
      <div className='flex flex-col justify-center items-start h-full ml-6 xs:ml-12 xsm:ml-24 lg:ml-32 '>
        <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
        <button className={`${common.buttonLinkTwo}`}>See Product</button>
      </div>
      <div className='absolute top-0 block w-full h-full -z-10 rounded-lg overflow-hidden'>
        {
          loaded &&
          <img src={image}
            alt='Product Banner' className='object-cover w-full h-full group-hover:scale-102 transition-transform' />
        }
      </div>

    </Link>
  )
}

export default ZX7BannerCard
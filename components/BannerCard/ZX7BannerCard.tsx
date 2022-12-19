import Link from 'next/link';
import { useMediaQuery } from 'react-responsive'
import React, { useState, useEffect } from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const ZX7BannerCard = ({ data, ...props }: BannerProps) => {
  const header = getRichText(data.header);

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 576 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80 relative`}>
      <div className='flex flex-col justify-center items-start h-full ml-6 xs:ml-12 xsm:ml-24 lg:ml-32 '>
        <h1 className={`${common.headerTwo} mb-8`}>{header}</h1>
        <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkTwo}`}>See Product</Link>
      </div>
      {
        loaded &&
          <img src={isDesktop ? data.imageDesktop : isTablet ? data.imageTablet : data.imageMobile}
            alt='Product Banner' className='absolute top-0 block w-full h-full object-cover rounded-lg -z-10' />
      }

    </div>
  )
}

export default ZX7BannerCard
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const YX1BannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header);

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 376 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black flex flex-col xsm:h-[320px] xsm:flex-row gap-6 xsm:gap-3 lg:gap-[30px]`}>
      <div className='flex-1'>
        {
          !loaded ? null :
            <img src={isDesktop ? data.imageDesktop : isTablet ? data.imageTablet : data.imageMobile}
              alt='Product Banner' className='w-full h-[200px] xsm:h-full object-cover rounded-lg' />
        }

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
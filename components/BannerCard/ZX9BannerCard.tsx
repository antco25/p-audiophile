import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PatternCircles } from '../Icons';
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';
import { useMediaQuery } from 'react-responsive';

const ZX9BannerCard = ({ data, ...props }: BannerProps) => {
  const header = getRichText(data.header);
  const description = getRichText(data.description);

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 576 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white h-[600px] xsm:h-[720px] lg:h-[560px]`}>
      <div className='bg-pOrange-200 h-full overflow-hidden rounded-lg flex flex-col lg:flex-row relative'>
        <div className='relative flex-1'>
          <PatternCircles
            className={`absolute -top-[121px] xsm:-top-[288px] lg:-top-[36px] right-2/4 lg:-right-[240px] translate-x-2/4 lg:translate-x-0 
            w-[558px] xsm:w-[944px] h-[558px] xsm:h-[944px]`} />
          {
            !loaded ? null :
              <img src={isDesktop ? data.imageDesktop : isTablet ? data.imageTablet : data.imageMobile}
                alt='Product Banner'
                className={`absolute top-[55px] xs:top-[52px] lg:top-auto lg:-bottom-2 right-2/4 lg:right-11 translate-x-2/4 lg:translate-x-0 
                w-[170px] xsm:w-[200px] lg:w-[23rem]`} />
          }
        </div>
        <div className='flex-1'>
          <div className={`relative h-full flex flex-col justify-end xs:justify-center z-10 items-center lg:items-start lg:ml-28 text-center lg:text-left 
          px-6 pb-14 xsm:pb-16 lg:p-0`}>
            <h1 className='uppercase font-bold text-[2.25rem] leading-10 xsm:text-[3.5rem] xsm:leading-[3.625rem] mb-6'>{header}</h1>
            <p className='text-base xs:max-w-xs mb-6 xs:mb-10'>{description}</p>
            <Link href={`/products/${data.productSlug}`} className={`${common.buttonLinkThree}`}>See Product</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZX9BannerCard
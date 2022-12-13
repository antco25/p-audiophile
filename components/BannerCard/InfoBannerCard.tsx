import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

const InfoBannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header, 'text-orange-400');
  const description = getRichText(data.description);

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isTablet = useMediaQuery({ minWidth: 376 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`${props.className ? props.className + ' ' : ''}
      text-black flex flex-col items-center lg:flex-row gap-10 xsm:gap-[63px] lg:gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 text-center lg:text-left'>
        <h1 className={`${common.headerOne} lg:max-w-[445px] xsm:max-w-[573px] xs:max-w-[345px] mb-8`}>{header}</h1>
        <p className='text-base opacity-50 lg:max-w-[445px] sm:max-w-[573px] '>{description}</p>
      </div>
      <div className='lg:flex-1 lg:order-2 h-[300px] lg:h-[588px] '>
        {
          !loaded ? null :
            <img src={isDesktop ? data.imageDesktop : isTablet ? data.imageTablet : data.imageMobile}
              alt='Product Banner' className='block w-full h-full object-cover rounded-lg' />
        }
      </div>
    </div>
  )
}

export default InfoBannerCard
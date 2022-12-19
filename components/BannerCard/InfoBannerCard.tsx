import React from 'react'
import { getRichText } from '../../lib';
import { BannerPageProps } from './BannerProps';
import common from '../common.module.scss';
import { ScreenSize } from '../../pages/_app';

const InfoBannerCard = ({ data, loaded, screenSize, ...props }: BannerPageProps) => {

  const header = getRichText(data.header, 'text-pOrange-200');
  const description = getRichText(data.description);
  const image = screenSize === ScreenSize.DESKTOP ? data.imageDesktop : screenSize === ScreenSize.TABLET ? data.imageTablet : data.imageMobile

  return (
    <div className={`${props.className ? props.className + ' ' : ''}
      text-black flex flex-col items-center lg:flex-row gap-10 xsm:gap-[63px] lg:gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 text-center lg:text-left'>
        <h1 className={`${common.headerOne} lg:max-w-[445px] xsm:max-w-[573px] xs:max-w-[345px] mb-8`}>{header}</h1>
        <p className='text-base opacity-50 lg:max-w-[445px] sm:max-w-[573px] '>{description}</p>
      </div>
      <div className='lg:flex-1 lg:order-2 h-[300px] lg:h-[588px] '>
        {
          loaded &&
          <img src={image}
            alt='Product Banner' className='block w-full h-full object-cover rounded-lg' />
        }
      </div>
    </div>
  )
}

export default InfoBannerCard
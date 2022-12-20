import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';


const InfoBannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header, 'text-pOrange-200');
  const description = getRichText(data.description);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}
      text-black flex flex-col items-center lg:flex-row gap-10 xsm:gap-[63px] lg:gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 text-center lg:text-left'>
        <h1 className={`${common.headerOne} lg:max-w-[445px] xsm:max-w-[573px] xs:max-w-[345px] mb-8`}>{header}</h1>
        <p className='text-base opacity-50 lg:max-w-[445px] sm:max-w-[573px] '>{description}</p>
      </div>
      <div className='lg:flex-1 w-full lg:w-auto lg:order-2 h-[300px] lg:h-[588px] '>
        <img src={data.imageDesktop} alt='Product Banner' className='w-full h-full object-cover rounded-lg hidden lg:block' />
        <img src={data.imageTablet} alt='Product Banner' className='w-full h-full object-cover rounded-lg hidden xs:block lg:hidden' />
        <img src={data.imageMobile} alt='Product Banner' className='w-full h-full object-cover rounded-lg block xs:hidden' />
      </div>
    </div>
  )
}

export default InfoBannerCard
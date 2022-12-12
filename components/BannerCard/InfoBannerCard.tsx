import Image from 'next/image';
import React from 'react'
import { getRichText } from '../../lib';
import BannerProps from './BannerProps';
import common from '../common.module.scss';

//TODO: Picture responsive
const InfoBannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header, 'text-orange-400');
  const description = getRichText(data.description);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}
      text-black lg:h-[588px] flex flex-col items-center lg:flex-row gap-10 xsm:gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 text-center lg:text-left'>
        <h1 className={`${common.headerOne} xsm:max-w-[573px] xs:max-w-[345px] mb-8`}>{header}</h1>
        <p className='text-base lg:max-w-[410px] sm:max-w-[573px] xsm:mb-10 opacity-50'>{description}</p>
      </div>
      <div className='flex-1 lg:order-2'>
        <Image src={data.imageDesktop} width={540} height={588} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
    </div>
  )
}

export default InfoBannerCard
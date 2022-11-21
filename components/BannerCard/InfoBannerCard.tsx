import Image from 'next/image';
import React from 'react'
import { getRichText } from '../../lib/utils';
import BannerProps from './BannerProps';

const InfoBannerCard = ({ data, ...props }: BannerProps) => {

  const header = getRichText(data.header, 'text-orange-400');
  const description = getRichText(data.description);

  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-[588px] flex gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-start'>
        <h1 className='uppercase text-4xl font-bold mb-8'>{header}</h1>
        <p className='text-sm font-medium max-w-[410px] mb-10 opacity-50'>{description}</p>
      </div>
      <div className='flex-1'>
        <Image src={data.imageDesktop} width={540} height={588} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
    </div>
  )
}

export default InfoBannerCard
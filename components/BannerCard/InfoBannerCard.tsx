import Image from 'next/image';
import React from 'react'
import image from '../../public/assets/shared/desktop/image-best-gear.jpg';

const InfoBannerCard = ({ ...props }) => {
  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-[588px] flex gap-5`}>
      <div className='flex-1 flex flex-col justify-center items-start'>
        <h1 className='uppercase text-4xl font-bold mb-8'>Bringing you the <br/><span className='text-orange-400'>best</span> audio gear</h1>
        <p className='text-sm font-medium max-w-[410px] mb-10 opacity-50'>
          Located at the heart of New York City, Audiophile is the premier store for high end headphones,
          earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
          rooms available for you to browse and experience a wide range of our products. Stop by our store
          to meet some of the fantastic people who make Audiophile the best place to buy your portable
          audio equipment.</p>
      </div>
      <div className='flex-1'>
        <Image src={image} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
    </div>
  )
}

export default InfoBannerCard
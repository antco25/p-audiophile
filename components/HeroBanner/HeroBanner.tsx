import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import image from '../../public/assets/home/desktop/image-hero.jpg';

const HeroBanner = ({ ...props }) => {
  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white h-[632px] flex`}>
      <div className='flex-1 flex flex-col justify-center items-start'>
        <p className='text-sm uppercase opacity-50 tracking-[.625rem]'>New Product</p>
        <h1 className='uppercase text-6xl font-bold mb-8'>XX99 Mark II Heaphones</h1>
        <p className='text-sm font-medium max-w-[410px] mb-10 opacity-75'>
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
        <Link href='/' className='uppercase font-bold bg-orange-400 hover:bg-orange-300 py-4 px-7 text-sm z-10'>See Product</Link>
      </div>
      <div className='flex-1'>
        <Image src={image} alt='Product Banner' className='absolute left-1/2 -translate-x-2/4 top-0  h-[729px] object-cover -z-10' />
        <div className='absolute bg-[#181818] w-full left-0 top-0 h-[729px] rounded-lg -z-20'></div>
      </div>
    </div>
  )
}

export default HeroBanner
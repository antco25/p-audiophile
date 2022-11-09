import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import image from '../../public/assets/home/desktop/image-speaker-zx9.png';
import { PatternCircles } from '../Icons';

const ZX9BannerCard = ( {...props}) => {
  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-white h-[35rem]`}>
      <div className='bg-orange-400 h-full overflow-hidden rounded-lg flex relative'>
        <PatternCircles className='absolute -left-[96px] -top-[36px]' />
        <div className='relative flex-1'>
          <Image src={image} alt='Product Banner' className='absolute -bottom-2 left-[192px] w-[23rem] ' />
        </div>
        <div className='flex-1 flex flex-col justify-center items-start ml-52'>
          <h1 className='uppercase text-6xl font-bold mb-6'>ZX9 <br /> Speaker</h1>
          <p className='text-sm font-medium max-w-xs mb-10'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
          <Link href='/' className='uppercase font-bold bg-black hover:bg-slate-800 py-4 px-7 text-sm z-10'>See Product</Link>
        </div>
      </div>
    </div>
  )
}

export default ZX9BannerCard
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import image from '../../public/assets/home/desktop/image-earphones-yx1.jpg';

const YX1BannerCard = ({ ...props }) => {
  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80  flex gap-8`}>
      <div className='flex-1'>
        <Image src={image} alt='Product Banner' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-start bg-slate-100 rounded-lg'>
        <h1 className='uppercase text-3xl font-bold mb-8 ml-24'>YX1 Earphones</h1>
        <Link href='/' className='uppercase font-bold border border-black hover:bg-black hover:text-white py-4 px-7 text-sm ml-24'>See Product</Link>
      </div>
    </div>
  )
}

export default YX1BannerCard
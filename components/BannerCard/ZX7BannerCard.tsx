import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ZX7BannerCard = ( {...props}) => {

  //TODO: Change BG url into variable
  //TODO: href variable
  
  return (
    <div className={`${props.className ? props.className + ' ' : ''}text-black h-80 rounded-lg bg-cover bg-[url('../public/assets/home/desktop/image-speaker-zx7.jpg')]`}>
        <div className='flex flex-col justify-center items-start ml-32 h-full'>
          <h1 className='uppercase text-3xl font-bold mb-8'>ZX7 Speaker</h1>
          <Link href='/' className='uppercase font-bold border border-black hover:bg-black hover:text-white py-4 px-7 text-sm'>See Product</Link>
        </div>
    </div>
  )
}

export default ZX7BannerCard
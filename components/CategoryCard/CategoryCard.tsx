import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from '../Icons';

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    category: string,
    thumbnail: StaticImageData
}

const CategoryCard = ({ category, thumbnail, ...props } : CategoryCardProps) => {
    return (
        <div {...props}>
            <Link href={`/category/${category}`} className='h-full relative flex flex-col justify-end'>
                <div className='bg-slate-200 rounded-lg h-52 p-8 uppercase relative flex flex-col justify-end'>
                    <h1 className='text-lg text-center mb-3.5'>{category}</h1>
                    <div className='flex justify-center'>
                        <p className='inline-block text-xs opacity-50 mr-3'>Shop</p>
                        <ArrowRight className='inline-block self-center' />
                    </div>
                </div>
                <Image className='absolute w-2/4 left-2/4 -translate-x-2/4 bottom-20' src={thumbnail} alt='category thumbnail' />
            </Link>
        </div>
    )
}



export default CategoryCard
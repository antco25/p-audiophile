import Link from 'next/link';
import React from 'react';
import { Categories } from '../../lib/sanityType';
import { ArrowRight } from '../Icons';

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    category: string,
    thumbnail: string,
}

interface CategoryCardsProps extends React.HTMLAttributes<HTMLDivElement> {
    categories: Categories[],
}

const CategoryCard = ({ category, thumbnail, ...props }: CategoryCardProps) => {
    return (
        <div {...props}>
            <Link href={`/category/${category.toLowerCase()}`} className='h-full relative flex flex-col justify-end group'>
                <div className={`bg-pLight-200 rounded-lg uppercase relative flex flex-col justify-end 
                h-[165px] xsm:h-[165px] lg:h-[204px] p-[22px] lg:p-[30px]`}>
                    <h1 className='font-bold text-base lg:text-lg leading-5 lg:leading-[25px] text-center mb-4 lg:mb-3.5'>{category}</h1>
                    <div className='flex justify-center'>
                        <p className='inline-block text-sm leading-[18px] opacity-50 mr-3 group-hover:text-pOrange-200'>Shop</p>
                        <ArrowRight className='inline-block self-center' />
                    </div>
                </div>
                <img src={thumbnail} alt='category thumbnail'
                    className='absolute w-40 lg:w-52 left-2/4 -translate-x-2/4 bottom-16 xsm:bottom-14 lg:bottom-16' />
            </Link>
        </div>
    )
}

export const CategoryCards = ({ categories, ...props }: CategoryCardsProps) => {
    return (
        <div {...props}>
            <div className='flex flex-col xsm:flex-row gap-4 xsm:gap-[10px] lg:gap-[30px] h-[683px] xsm:h-[217px] lg:h-[284px]'>
                {
                    categories.map((category, index) => {
                        return <CategoryCard key={index} category={category.name} thumbnail={category.image} className='flex-1' />
                    })
                }
            </div>
        </div>
    )
}



export default CategoryCard
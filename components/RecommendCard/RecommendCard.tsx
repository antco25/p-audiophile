import Link from 'next/link';
import React from 'react';
import { Recommendation } from '../../lib';
import common from '../common.module.scss';

interface RecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Recommendation
}

const RecommendCard = ({ data, ...props }: RecommendCardProps) => {
    return (
        <div {...props}>
            <Link href={`/products/${data.slug}`} className='group flex flex-col justify-center items-center'>
                <div className='rounded-lg w-full h-[120px] xsm:h-[318px] mb-8 xsm:mb-10 overflow-hidden'>
                    <img src={data.recommendImage[0]} alt='product thumbnail'
                        className='object-cover rounded-lg h-full w-full group-hover:scale-105 transition-transform hidden lg:block' />
                    <img src={data.recommendImage[1]} alt='product thumbnail'
                        className='object-cover rounded-lg h-full w-full group-hover:scale-105 transition-transform hidden xsm:block lg:hidden' />
                    <img src={data.recommendImage[2]} alt='product thumbnail'
                        className='object-cover rounded-lg h-full w-full group-hover:scale-105 transition-transform block xsm:hidden' />
                </div>
                <h1 className='uppercase font-bold text-2xl leading-[33px] text-center mb-8'>{data.name}</h1>
                <button className={`${common.buttonLinkOne} inline-block text-white`} >See Product</button>
            </Link>
        </div>
    )
}

export default RecommendCard
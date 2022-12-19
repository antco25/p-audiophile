import Link from 'next/link';
import React from 'react';
import { Recommendation } from '../../lib';
import { ScreenSize } from '../../pages/_app';
import common from '../common.module.scss';

interface RecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Recommendation,
    screenSize: ScreenSize
}

const RecommendCard = ({ data, screenSize, ...props }: RecommendCardProps) => {
    return (
        <div {...props}>
            <div className='flex flex-col justify-center items-center'>
                <img src={data.recommendImage[screenSize]} alt='product thumbnail'
                    className='object-cover w-full h-[120px] xsm:h-[318px] mb-8 xsm:mb-10' />
                <h1 className='uppercase font-bold text-2xl leading-[33px] text-center mb-8'>{data.name}</h1>
                <Link href={`/products/${data.slug}`} className={`${common.buttonLinkOne} inline-block text-white`} >See Product</Link>
            </div>
        </div>
    )
}



export default RecommendCard
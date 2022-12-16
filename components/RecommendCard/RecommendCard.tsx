import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Recommendation } from '../../lib';
import commonStyles from '../common.module.scss';

interface RecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Recommendation
}

//TODO: Media query
const RecommendCard = ({ data, ...props }: RecommendCardProps) => {
    const imageSize = 0;

    return (
        <div {...props} className={`${props.className ? props.className + ' ' : ''}flex flex-col justify-center items-center`}>
            <Image className='mb-10' src={data.recommendImage[imageSize]} width={500} height={500} alt='product thumbnail' />
            <h1 className='uppercase font-bold text-2xl text-center mb-8'>{data.name}</h1>
            <Link href={`/products/${data.slug}`} className={`${commonStyles.buttonLinkOne} inline-block text-white`} >See Product</Link>
        </div>
    )
}



export default RecommendCard
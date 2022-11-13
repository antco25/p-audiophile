import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import commonStyles from '../common.module.scss';

interface RecommendCardProps extends React.HTMLAttributes<HTMLDivElement> {
    productData: {
        name: string,
        thumbnail: StaticImageData
    }
}

const RecommendCard = ({ productData, ...props }: RecommendCardProps) => {
    return (
        <div {...props} className={`${props.className ? props.className + ' ' : ''}flex flex-col justify-center items-center`}>
            <Image className='mb-10' src={productData.thumbnail} alt='product thumbnail' />
            <h1 className='uppercase font-bold text-2xl text-center mb-8'>{productData.name}</h1>
            <Link href='/products/xx99' className={`${commonStyles.buttonLinkOne} inline-block text-white`} >See Product</Link>
        </div>
    )
}



export default RecommendCard
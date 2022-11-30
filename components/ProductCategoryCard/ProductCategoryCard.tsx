import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CategoryProduct } from '../../lib';
import commonStyles from '../common.module.scss';

interface ProductCategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: CategoryProduct,
    reverse?: boolean,
}

//TODO: Media query for image source
const ProductCategoryCard = ({ data, reverse, ...props }: ProductCategoryCardProps) => {
    return (
        <div className={`${props.className ? props.className + ' ' : ''}flex gap-x-[20px]`}>
            <div className={`${reverse ? 'order-1 ' : ''}flex-1`}>
                <Image src={data.categoryImage[0]} alt='Product image' width={500} height={500} className='rounded-lg' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
                <div className={`${reverse ? 'mr-[105px]' : 'ml-[105px]'}`}>
                    {data.newProduct ? <p className={`${commonStyles.newProductText} text-orange-400 mb-4 `}>New Product</p> : null}
                    <h1 className='uppercase font-bold text-4xl mb-8'>{data.name}<br />{data.category}</h1>
                    <p className='mb-10 opacity-50 font-medium'>{data.description}</p>
                    <Link href={`/products/${data.slug}`} className={`${commonStyles.buttonLinkOne} inline-block text-white`} >See Product</Link>
                </div>
            </div>

        </div>
    )
}



export default ProductCategoryCard
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import commonStyles from '../common.module.scss';

interface ProductCategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        name: string,
        newProduct: boolean,
        image: StaticImageData,
        description: string
    },
    category: string,
    reverse?: boolean,
}

const ProductCategoryCard = ({ data, category, reverse, ...props }: ProductCategoryCardProps) => {
    return (
        <div className={`${props.className ? props.className + ' ' : ''}flex gap-x-[20px]`}>
            <div className={`${reverse ? 'order-1 ' : ''}flex-1`}>
                <Image src={data.image} alt='Product image' className='rounded-lg' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
                <div className={`${reverse ? 'mr-[105px]' : 'ml-[105px]'}`}>
                    {data.newProduct ? <p className={`${commonStyles.newProductText} text-orange-400 mb-4 `}>New Product</p> : null}
                    <h1 className='uppercase font-bold text-4xl mb-8'>{data.name}<br />{category}</h1>
                    <p className='mb-10 opacity-50 font-medium'>{data.description}</p>
                    <Link href='/' className={`${commonStyles.buttonLinkOne} inline-block text-white`} >See Product</Link>
                </div>
            </div>

        </div>
    )
}



export default ProductCategoryCard
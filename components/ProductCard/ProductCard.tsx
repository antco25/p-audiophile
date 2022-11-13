import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import commonStyles from '../common.module.scss';
import QuantityCounter from '../QuantityCounter';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        name: string,
        newProduct: boolean,
        category: string,
        price: number,
        image: StaticImageData,
        description: string
    },
}

const ProductCard = ({ data, ...props }: ProductCardProps) => {
    return (
        <div className={`${props.className ? props.className + ' ' : ''}flex gap-x-[20px]`}>
            <div className='flex-1'>
                <Image src={data.image} alt='Product image' className='rounded-lg' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
                <div className='ml-[105px]'>
                    {data.newProduct ? <p className={`${commonStyles.newProductText} text-orange-400 mb-4 `}>New Product</p> : null}
                    <h1 className='uppercase font-bold text-4xl mb-8'>{data.name}<br />{data.category}</h1>
                    <p className='mb-8 opacity-50 font-medium'>{data.description}</p>
                    <p className='mb-12 font-bold text-lg'>$ {data.price.toLocaleString()}</p>
                    <div className='flex gap-x-4'>
                        <QuantityCounter />
                        <button className={`${commonStyles.buttonLinkOne} text-white`}>Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default ProductCard
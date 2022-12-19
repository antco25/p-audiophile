import Link from 'next/link';
import React from 'react';
import { CategoryProduct } from '../../lib';
import { ScreenSize } from '../../pages/_app';
import common from '../common.module.scss';

interface ProductCategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: CategoryProduct,
    reverse?: boolean,
    loaded: boolean,
    screenSize: ScreenSize
}

const ProductCategoryCard = ({ data, reverse, loaded, screenSize, ...props }: ProductCategoryCardProps) => {

    return (
        <Link className={`${props.className ? props.className + ' ' : ''}group flex flex-col lg:flex-row gap-[32px] xsm:gap-[52px] lg:gap-[30px]`}
            href={`/products/${data.slug}`} >
            <div className={`${reverse ? 'lg:order-1 ' : ''}lg:flex-1 rounded-lg h-[352px] lg:h-[560px] overflow-hidden`}>
                {
                    loaded &&
                    <img src={data.categoryImage[screenSize]}
                        alt='Product image' className='h-full w-full object-cover mx-auto group-hover:scale-105 transition-transform' />
                }
            </div>
            <div className='flex-1'>
                <div className={`flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full 
                ${reverse ? 'lg:mr-16 xl:mr-24' : 'lg:ml-16 xl:ml-24'}`}>
                    {data.newProduct ? <p className={`${common.headerThree} text-pOrange-200 mb-6 xsm:mb-4 `}>New Product</p> : null}
                    <h1 className={`${common.headerOne} mb-6 xsm:mb-8`}>{data.name}<br />{data.category}</h1>
                    <p className='mb-6 lg:mb-10 opacity-50 text-base max-w-[572px]'>{data.description}</p>
                    <button className={`${common.buttonLinkOne} inline-block text-white`} >See Product</button>
                </div>
            </div>

        </Link>
    )
}



export default ProductCategoryCard
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextWrap';
import { ScreenSize } from '../../pages/_app';
import common from '../common.module.scss';
import QuantityCounter from '../QuantityCounter';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        name: string,
        newProduct: boolean,
        category: string,
        price: number,
        image: string[],
        description: string,
        cartImage: string,
        id: string,
        slug: string,
    },
    screenSize: ScreenSize
}

const ProductCard = ({ data, screenSize, ...props }: ProductCardProps) => {
    const { setShowCart, addToCart } = useStateContext();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setQuantity(1);
    }, [data])

    const onAddToCart = () => {
        const product = {
            name: data.name,
            price: data.price,
            quantity: quantity,
            cartImage: data.cartImage,
            id: data.id,
            slug: data.slug
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        addToCart(product);
        setShowCart(true);
    }

    const onQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    }

    return (
        <div className={`${props.className ? props.className + ' ' : ''}flex flex-col xsm:flex-row gap-8 xsm:gap-6 lg:gap-[30px]`}>
            <div className='flex-1'>
                <img src={data.image[screenSize]} alt='Product image' 
                className='rounded-lg object-cover w-full pr-0 min-[680px]:pr-11 min-[800px]:pr-0 h-[327px] xsm:h-[480px] lg:h-[560px]' />
            </div>
            <div className='flex-1'>
                <div className='flex flex-col justify-center items-start xsm:w-[300px] sm:w-[340px] lg:w-[446px] ml-auto h-full'>
                    {data.newProduct ? <p className={`${common.headerThree} text-pOrange-200 mb-6 xsm:mb-4 `}>New Product</p> : null}
                    <h1 className={`${common.headerFive} mb-6 xsm:mb-8`}>{data.name}<br />{data.category}</h1>
                    <p className='text-base opacity-50 mb-6 xsm:mb-8'>{data.description}</p>
                    <p className='font-bold text-lg leading-[1.5625rem] mb-8 xsm:mb-12'>$ {data.price.toLocaleString()}</p>
                    <div className='flex gap-4'>
                        <QuantityCounter initialQuantity={quantity} onQuantityChange={(onQuantityChange)} />
                        <button className={`${common.buttonLinkOne} text-white`} onClick={onAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default ProductCard
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context/ContextWrap';
import commonStyles from '../common.module.scss';
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
}

//TODO: Media query for image
const ProductCard = ({ data, ...props }: ProductCardProps) => {
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
        <div className={`${props.className ? props.className + ' ' : ''}flex gap-x-[20px]`}>
            <div className='flex-1'>
                <Image src={data.image[0]} width={500} height={500} alt='Product image' className='rounded-lg' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-start'>
                <div className='ml-[105px]'>
                    {data.newProduct ? <p className={`${commonStyles.newProductText} text-orange-400 mb-4 `}>New Product</p> : null}
                    <h1 className='uppercase font-bold text-4xl mb-8'>{data.name}<br />{data.category}</h1>
                    <p className='mb-8 opacity-50 font-medium'>{data.description}</p>
                    <p className='mb-12 font-bold text-lg'>$ {data.price.toLocaleString()}</p>
                    <div className='flex gap-x-4'>
                        <QuantityCounter initialQuantity={quantity} onQuantityChange={(onQuantityChange)} />
                        <button className={`${commonStyles.buttonLinkOne} text-white`} onClick={onAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default ProductCard
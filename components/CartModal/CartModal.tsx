import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import commonStyles from '../common.module.scss';

//TODO: Get from db
import tbXX99 from '../../public/assets/shared/desktop/image-xx99-mark-two-headphones.jpg'
import tbXX59 from '../../public/assets/shared/desktop/image-xx59-headphones.jpg'
import tbZX9 from '../../public/assets/shared/desktop/image-zx9-speaker.jpg'
import QuantityCounter from '../QuantityCounter';

let cartData = [
  {
    name: 'XX99 MK II',
    price: 2999,
    quantity: 1,
    thumbnail: tbXX99
  },
  {
    name: 'XX59',
    price: 899,
    quantity: 2,
    thumbnail: tbXX59
  },
  {
    name: 'YX1',
    price: 599,
    quantity: 1,
    thumbnail: tbZX9
  },
]

//cartData = []
const totalPrice = 5396;

const CartModal = () => {

  const emptyCart = (
    <div className='flex h-full justify-center items-center'>
      Your cart is empty
    </div>
  )
  return (
    <div className='bg-black/40 fixed h-full w-full top-0 left-0 z-20'>
      <div className={`${commonStyles.appWrap} h-full relative`}>
        <div className='absolute right-0 top-[130px] bg-white rounded-lg w-[377px] p-8'>
          <div className='flex mb-8'>
            <h1 className='flex-1 uppercase font-bold text-lg'>Cart (3)</h1>
            <button className='underline opacity-50 font-medium'>Remove all</button>
          </div>
          <div className='mb-8 h-[240px] overflow-auto'>
            {
              cartData.length === 0 ? emptyCart :
                cartData.map((data, index, arr) => {
                  return (
                    <div key={index} className={`flex items-center${index + 1 === arr.length ? '' : ' mb-6'}`}>
                      <div className='w-16 h-16 mr-4'>
                        <Image className='w-full h-full object-cover rounded-lg' src={data.thumbnail} alt='Product thumbnail' />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <span className='uppercase font-bold'>{data.name}</span>
                        <span className='text-sm font-bold opacity-50'>$ {data.price.toLocaleString()}</span>
                      </div>
                      <QuantityCounter className='w-24 h-8' />
                    </div>
                  )
                })
            }
          </div>
          <div className='flex items-center mb-6'>
            <span className='flex-1 uppercase opacity-50 font-medium'>Total</span>
            <span className='text-lg font-bold'>$ {totalPrice.toLocaleString()}</span>
          </div>
          <Link href='/' className={`${commonStyles.buttonLinkOne} text-white text-center block`}>Checkout</Link>
        </div>
      </div>
    </div>
  )
}

export default CartModal
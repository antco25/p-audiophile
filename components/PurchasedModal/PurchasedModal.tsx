import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { useStateContext } from '../../context/ContextWrap';
import commonStyles from '../common.module.scss';
import { OrderConfirm } from '../Icons';

interface PurchasedModalProps {
  totalPrice: number
}

const PurchasedModal = ({ totalPrice }: PurchasedModalProps) => {
  const { cartItems, setResetCart } = useStateContext();

  return (
    <div className='bg-black/40 fixed h-full w-full top-0 left-0 z-20'>
      <div className={`${commonStyles.appWrap} h-full relative`}>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[540px] content-border p-12'>
          <OrderConfirm className='mb-8' />
          <h1 className='uppercase font-bold text-[2rem] mb-6'>Thank you<br />for your order</h1>
          <p className='font-medium opacity-50 mb-8'>You will receive an email confirmation shortly.</p>
          <div className='flex w-full mb-12'>
            <div className='flex flex-col justify-center flex-1 bg-slate-100 rounded-l-lg p-6'>
              {
                cartItems.length === 0 ? null :
                  <div className='flex items-center'>
                    <div className='w-16 h-16 mr-4'>
                      <Image className='w-full h-full object-cover rounded-lg' src={cartItems[0].cartImage} width={150} height={150} alt='Product thumbnail' />
                    </div>
                    <div className='flex flex-col flex-1 relative'>
                      <span className='uppercase font-bold'>{cartItems[0].name}</span>
                      <span className='absolute right-0 font-bold opacity-50'>x{cartItems[0].quantity}</span>
                      <span className='text-sm font-bold opacity-50'>$ {cartItems[0].price.toLocaleString()}</span>
                    </div>
                  </div>
              }
              {
                cartItems.length <= 1 ? null :
                  <>
                    <hr className='my-3' />
                    <p className='text-xs text-center font-bold opacity-50'>and {cartItems.length - 1} other item(s)</p>
                  </>
              }
            </div>
            <div className='bg-black rounded-r-lg py-[42px] px-8'>
              <span className='block uppercase text-white opacity-50 mb-2'>Grand Total</span>
              <span className='text-white text-lg font-bold'>$ {totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <Link href='/' className={`${commonStyles.buttonLinkOne} text-white text-center block${cartItems.length === 0 ? ' hidden' : ''}`}
            onClick={() => setResetCart(true)}>Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default PurchasedModal
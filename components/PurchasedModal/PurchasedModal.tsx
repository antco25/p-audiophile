import React from 'react'
import Link from 'next/link'
import { useStateContext } from '../../context/ContextWrap';
import common from '../common.module.scss';
import { OrderConfirm } from '../Icons';

interface PurchasedModalProps {
  totalPrice: number
}

const PurchasedModal = ({ totalPrice }: PurchasedModalProps) => {
  const { cartItems, setResetCart } = useStateContext();

  return (
    <div className='bg-black/40 absolute h-full w-full top-0 left-0 z-20'>
      <div className={`h-full relative mx-6 xs:mx-8`}>
        <div className='absolute top-[222px] left-1/2 -translate-x-1/2 bg-white rounded-lg w-full min-[604px]:w-[540px] content-border p-8 xsm:p-12'>
          <OrderConfirm className='mb-6 xsm:mb-8' />
          <h1 className='uppercase font-bold text-[1.5rem] xsm:text-[2rem] leading-7 xsm:leading-9 mb-4 xsm:mb-6'>Thank you<br />for your order</h1>
          <p className='text-base opacity-50 mb-6 xsm:mb-8'>You will receive an email confirmation shortly.</p>
          <div className='flex flex-col xsm:flex-row w-full mb-6 xsm:mb-12'>
            <div className='flex flex-col justify-center flex-1 bg-pLight-200 rounded-t-lg xsm:rounded-tr-none xsm:rounded-l-lg p-6'>
              {
                cartItems.length === 0 ? null :
                  <div className='flex items-center'>
                    <div className='w-[50px] h-[50px] mr-4'>
                      <img className='object-cover rounded-lg' src={cartItems[0].cartImage} alt='Product thumbnail' />
                    </div>
                    <div className='flex flex-col flex-1 relative'>
                      <span className='uppercase font-bold'>{cartItems[0].name}</span>
                      <span className='absolute right-0 font-bold text-base opacity-50'>x{cartItems[0].quantity}</span>
                      <span className={`${common.cartPrice} opacity-50`}>$ {cartItems[0].price.toLocaleString()}</span>
                    </div>
                  </div>
              }
              {
                cartItems.length <= 1 ? null :
                  <>
                    <hr className='border-black opacity-10 my-3' />
                    <p className='text-xs text-center font-bold opacity-50'>and {cartItems.length - 1} other item(s)</p>
                  </>
              }
            </div>
            <div className='bg-black rounded-b-lg px-6 xsm:rounded-bl-none xsm:rounded-r-lg w-full xsm:w-[170px] sm:w-[198px] h-[92px] xsm:h-auto'>
              <div className='flex flex-col justify-center gap-2 h-full'>
                <span className='block uppercase text-white opacity-50 text-base'>Grand Total</span>
                <span className='text-white text-lg leading-[1.5625rem] font-bold'>$ {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Link href='/' className={`${common.buttonLinkOne} text-white text-center block${cartItems.length === 0 ? ' hidden' : ''}`}
            onClick={() => setResetCart(true)}>Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

export default PurchasedModal
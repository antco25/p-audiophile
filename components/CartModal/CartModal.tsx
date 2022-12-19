import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import QuantityCounter from '../QuantityCounter';
import { useStateContext } from '../../context/ContextWrap';
import { Cross } from '../Icons';
import { useMediaQuery } from 'react-responsive';
import common from '../common.module.scss';

const CartModal = () => {
  const { showCart, setShowCart, cartItems, removeFromCart, removeAllCart, updateCartItem, totalPrice } = useStateContext();

  let scrollYPosition = 0;
  const onScroll = useCallback(() => {
    const { pageYOffset, innerHeight } = window;
    if ((pageYOffset + innerHeight > 800) && ((pageYOffset - scrollYPosition) > 0)) {
      setShowCart(false);
    } else {
      scrollYPosition = pageYOffset;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollYPosition = window.pageYOffset;

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [showCart])

  const emptyCart = (
    <div className='flex h-full justify-center items-center'>
      Your cart is empty
    </div>
  )

  const isTablet = useMediaQuery({ minWidth: 576 })

  return (
    <div className='bg-black/40 absolute h-full w-full min-w-[375px] top-0 left-0 z-20' onClick={() => setShowCart(false)}>
      <div className={`${common.appWrap} h-full relative`}>
        <div className={`absolute top-[130px] translate-x-2/4 xsm:translate-x-0 right-2/4 xsm:right-8 sm:right-10 min-[1160px]:right-0 
         w-full min-[441px]:w-[377px]`}
          onClick={(e) => { e.stopPropagation() }}>
          <div className='bg-white rounded-lg py-8 p-7 xsm:px-8 mx-6 xs:mx-8 min-[441px]:m-0'>
            <div className='flex mb-8'>
              <h1 className='flex-1 uppercase font-bold text-lg leading-[1.5625rem]'>Cart ({cartItems.length})</h1>
              <button className={`underline opacity-50 hover:text-pOrange-200 text-base${cartItems.length === 0 ? ' invisible' : ''}`}
                onClick={() => removeAllCart()}>Remove all</button>
            </div>
            <div className='mb-8 max-h-[240px] overflow-auto'>
              {
                cartItems.length === 0 ? emptyCart :
                  cartItems.map((cartItem, index, arr) => {
                    return (
                      <div key={index} className={`flex relative items-center${index + 1 === arr.length ? '' : ' mb-6'}`}>
                        <Link href={`/products/${cartItem.slug}`} onClick={() => setShowCart(false)} className='flex flex-1 items-center group'>
                          <div className='w-16 h-16 mr-4'>
                            <img className='w-full h-full object-cover rounded-lg' src={cartItem.cartImage} alt='Product thumbnail' />
                          </div>
                          <div className='flex flex-col flex-1'>
                            <span className='uppercase font-bold text-base group-hover:underline'>{isTablet ? cartItem.name : cartItem.name.split(/\s(.+)/)[0]}</span>
                            <span className='text-sm font-bold text-[0.875rem] leading-[1.5625rem] opacity-50 group-hover:underline'>$ {cartItem.price.toLocaleString()}</span>
                          </div>
                        </Link>
                        <div className={`w-24 relative${arr.length > 3 ? ' mr-2' : ''}`}>
                          <QuantityCounter initialQuantity={cartItem.quantity} className='h-8'
                            onQuantityChange={(quantity) => updateCartItem(cartItem, quantity)} />
                          <Cross className='absolute w-[10px] h-[10px] right-0 -top-4 cursor-pointer group' fillClass='group-hover:fill-pOrange-200'
                            onClick={() => removeFromCart(cartItem)} />
                        </div>
                      </div>
                    )
                  })
              }
            </div>
            <div className={`flex items-center${cartItems.length === 0 ? '' : ' mb-6'}`}>
              <span className='flex-1 uppercase opacity-50 font-medium'>Total</span>
              <span className='text-lg font-bold'>$ {cartItems.length === 0 ? 0 : totalPrice.toLocaleString()}</span>
            </div>
            <Link href='/checkout' className={`${common.buttonLinkOne} text-white text-center block${cartItems.length === 0 ? ' hidden' : ''}`}
              onClick={() => setShowCart(false)}
            >Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
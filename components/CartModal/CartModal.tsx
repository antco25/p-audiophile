import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import QuantityCounter from '../QuantityCounter';
import { useStateContext } from '../../context/ContextWrap';
import commonStyles from '../common.module.scss';
import { Cross } from '../Icons';

const CartModal = () => {
  const { showCart, setShowCart, cartItems, removeFromCart, removeAllCart, updateCartItem, totalPrice } = useStateContext();

  let scrollYPosition = 0;
  const onScroll = useCallback(() => {
    const { pageYOffset } = window;
    if ((pageYOffset - scrollYPosition) > 0) {
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

  return (
    <div className='bg-black/40 fixed h-full w-full top-0 left-0 z-20' onClick={() => setShowCart(false)}>
      <div className={`${commonStyles.appWrap} h-full relative`}>
        <div className='absolute right-0 top-[130px] bg-white rounded-lg w-[377px] p-8' onClick={(e) => { e.stopPropagation() }}>
          <div className='flex mb-8'>
            <h1 className='flex-1 uppercase font-bold text-lg'>Cart ({cartItems.length})</h1>
            <button className={`underline opacity-50 hover:text-orange-500 font-medium${cartItems.length === 0 ? ' invisible' : ''}`} onClick={() => removeAllCart()}>Remove all</button>
          </div>
          <div className='mb-8 h-[240px] overflow-auto'>
            {
              cartItems.length === 0 ? emptyCart :
                cartItems.map((cartItem, index, arr) => {
                  return (
                    <div key={index} className={`flex relative items-center${index + 1 === arr.length ? '' : ' mb-6'}`}>
                      <Link href={`/products/${cartItem.slug}`} onClick={() => setShowCart(false)} className='flex flex-1 items-center group'>
                        <div className='w-16 h-16 mr-4'>
                          <Image className='w-full h-full object-cover rounded-lg' src={cartItem.cartImage} width={150} height={150} alt='Product thumbnail' />
                        </div>
                        <div className='flex flex-col flex-1'>
                          <span className='uppercase font-bold group-hover:underline'>{cartItem.name}</span>
                          <span className='text-sm font-bold opacity-50 group-hover:underline'>$ {cartItem.price.toLocaleString()}</span>
                        </div>
                      </Link>
                      <QuantityCounter initialQuantity={cartItem.quantity} className='w-24 h-8'
                        onQuantityChange={(quantity) => updateCartItem(cartItem, quantity)} />
                      <Cross className='absolute w-[10px] h-[10px] right-0 top-0 cursor-pointer group' fillClass='group-hover:fill-orange-500' onClick={() => removeFromCart(cartItem)} />
                    </div>
                  )
                })
            }
          </div>
          <div className={`flex items-center${cartItems.length === 0 ? '' : ' mb-6'}`}>
            <span className='flex-1 uppercase opacity-50 font-medium'>Total</span>
            <span className='text-lg font-bold'>$ {cartItems.length === 0 ? 0 : totalPrice.toLocaleString()}</span>
          </div>
          <Link href='/checkout' className={`${commonStyles.buttonLinkOne} text-white text-center block${cartItems.length === 0 ? ' hidden' : ''}`}
            onClick={() => setShowCart(false)}
          >Checkout</Link>
        </div>
      </div>
    </div>
  )
}

export default CartModal
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { client, formatCategories } from '../../lib';
import { useStateContext } from '../../context/ContextWrap';
import commonStyles from '../../components/common.module.scss';
import styles from './index.module.scss';
import { PurchasedModal } from '../../components';
import { CashOn } from '../../components/Icons';

const Checkout = () => {
  const router = useRouter();
  const { setShowCart, cartItems, totalPrice, getPrevLink, storeLink, consumePrevLink } = useStateContext();
  const shippingPrice = 50;
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(false);
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [payment, setPayment] = useState('eMoney');
  const [eNum, setENum] = useState('');
  const [ePin, setEPin] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) {
      setShowCart(false);
      router.push('/');
    }
  }, [cartItems])

  useEffect(() => {
    storeLink(router.asPath);
  }, [router.asPath])

  return (
    <div className={commonStyles.appWrap}>
      <Link href={getPrevLink()} onClick={consumePrevLink} className='block mt-20 mb-14 font-medium opacity-50 hover:underline'>Go back</Link>
      <div className='flex gap-x-5 mb-36'>
        <form className='flex-1 bg-slate-100 p-12 rounded-lg'>
          <h1 className='uppercase font-bold text-[32px] mt-[6px] mb-10'>Checkout</h1>
          <h2 className={styles.subHeader}>Billing Details</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6 mb-12'>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='name'>Name</label>
              <input className={styles.input} type="text" name='name' placeholder="Alexei Ward" />
            </div>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='email'>Email Address</label>
              <input className={styles.input} type="email" name='email' placeholder="alexeiward@gmail.com" />
            </div>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='phone'>Phone Number</label>
              <input className={styles.input} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" name='phone' placeholder="202-555-0136" />
            </div>
          </div>
          <h2 className={styles.subHeader}>Shipping Info</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6 mb-12'>
            <div className='flex flex-col col-span-2'>
              <label className={styles.label} htmlFor='address'>Address</label>
              <input className={styles.input} type="text" name='address' placeholder="1137 Williams Avenue" />
            </div>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='zip'>Zip Code</label>
              <input className={styles.input} type="number" name='zip' placeholder="10001" />
            </div>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='city'>City</label>
              <input className={styles.input} type="text" name='city' placeholder="New York" />
            </div>
            <div className='flex flex-col'>
              <label className={styles.label} htmlFor='country'>Country</label>
              <input className={styles.input} type="text" name='country' placeholder="United States" />
            </div>
          </div>
          <h2 className={styles.subHeader}>Payment Details</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6'>
            <div className='col-span-2 grid grid-cols-2 gap-x-4 gap-y-4'>
              <label className={`${styles.label} !mb-0 row-span-2`} htmlFor='payMethod'>Payment Method</label>
              <div className={styles.inputWrapRadio}>
                <input className='absolute invisible' id='eMoney' type="radio" name='payMethod' value="eMoney" defaultChecked />
                <label className={`${styles.labelRadio}${payment === 'eMoney' ? ' ' + styles.activeRadio : ''}`}
                  onClick={() => setPayment('eMoney')} htmlFor='eMoney'>e-Money</label>
              </div>
              <div className={styles.inputWrapRadio}>
                <input className='absolute invisible' id='cash' type="radio" name='payMethod' value="cash" />
                <label className={`${styles.labelRadio}${payment === 'cash' ? ' ' + styles.activeRadio : ''}`}
                  onClick={() => setPayment('cash')} htmlFor='cash'>Cash on Delivery</label>
              </div>
            </div>
            {
              payment === 'eMoney' ?
                <>
                  <div className='flex flex-col'>
                    <label className={styles.label} htmlFor='moneyNumber'>e-Money Number</label>
                    <input className={styles.input} type="number" name='moneyNumber' placeholder="238521993" />
                  </div>
                  <div className='flex flex-col'>
                    <label className={styles.label} htmlFor='moneyPin'>e-Money PIN</label>
                    <input className={styles.input} type="number" name='moneyPin' placeholder="6891" />
                  </div>
                </> :
                <div className='col-span-2 mt-2 flex items-center'>
                  <CashOn />
                  <p className='flex-1 font-medium opacity-50 ml-8'>
                    The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence.
                    Just make sure your address is correct so that your order will not be cancelled.
                  </p>
                </div>
            }
          </div>
        </form>
        <div className='w-[350px]'>
          <div className='bg-slate-100 rounded-lg p-8'>
            <h1 className='uppercase font-bold text-lg mb-8'>Summary</h1>
            <div className='mb-8 h-[240px] overflow-auto'>
              {
                cartItems.map((cartItem, index, arr) => {
                  return (
                    <div key={index} className={`flex items-center${index + 1 === arr.length ? '' : ' mb-6'}`}>
                      <div className='w-16 h-16 mr-4'>
                        <Image className='w-full h-full object-cover rounded-lg' src={cartItem.cartImage} width={150} height={150} alt='Product thumbnail' />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <span className='uppercase font-bold'>{cartItem.name}</span>
                        <span className='text-sm font-bold opacity-50'>$ {cartItem.price.toLocaleString()}</span>
                      </div>
                      <p className='font-bold opacity-50'>x{cartItem.quantity}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className='flex items-center mb-2'>
              <span className='flex-1 uppercase opacity-50 font-medium'>Total</span>
              <span className='text-lg font-bold'>$ {totalPrice.toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-2'>
              <span className='flex-1 uppercase opacity-50 font-medium'>Shipping</span>
              <span className='text-lg font-bold'>$ {shippingPrice.toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-6'>
              <span className='flex-1 uppercase opacity-50 font-medium'>VAT (Included)</span>
              <span className='text-lg font-bold'>$ {Math.round(totalPrice * 0.2).toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-8'>
              <span className='flex-1 uppercase opacity-50 font-medium'>Grand Total</span>
              <span className='text-lg font-bold text-orange-500'>$ {(totalPrice + shippingPrice).toLocaleString()}</span>
            </div>
            <button className={`${commonStyles.buttonLinkOne} text-white text-center block w-full`} onClick={() => setPurchaseModal(true)}>Continue & Pay</button>
          </div>
        </div>
      </div>
      {purchaseModal ? <PurchasedModal totalPrice={totalPrice + shippingPrice} /> : null}
    </div>
  )
}

export default Checkout

export const getServerSideProps: GetServerSideProps = async () => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  return {
    props: { categories }
  }
}
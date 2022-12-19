import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { client, formatCategories } from '../../lib';
import { useStateContext } from '../../context/ContextWrap';
import { PurchasedModal } from '../../components';
import { CashOn } from '../../components/Icons';
import FormField from './FormField';
import styles from './index.module.scss';
import common from '../../components/common.module.scss';

const Checkout = () => {
  const router = useRouter();
  const { setShowCart, cartItems, totalPrice, getPrevLink, storeLink, consumePrevLink } = useStateContext();
  const shippingPrice = 50;
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [name, setName] = useState({ value: '', error: false, errMessage: '' });
  const [email, setEmail] = useState({ value: '', error: false, errMessage: '' });
  const [phone, setPhone] = useState({ value: '', error: false, errMessage: '' });
  const [address, setAddress] = useState({ value: '', error: false, errMessage: '' });
  const [zip, setZip] = useState({ value: '', error: false, errMessage: '' });
  const [city, setCity] = useState({ value: '', error: false, errMessage: '' });
  const [country, setCountry] = useState({ value: '', error: false, errMessage: '' });
  const [payment, setPayment] = useState('eMoney');
  const [eNum, setENum] = useState({ value: '', error: false, errMessage: '' });
  const [ePin, setEPin] = useState({ value: '', error: false, errMessage: '' });

  useEffect(() => {
    if (cartItems.length === 0) {
      setShowCart(false);
      router.push('/');
    }
  }, [cartItems])

  useEffect(() => {
    storeLink(router.asPath);
  }, [router.asPath])

  const handleSetPayment = (payment: string) => {
    setPayment(payment);

    if (payment === 'cash') {
      setENum({ value: '', error: false, errMessage: '' });
      setEPin({ value: '', error: false, errMessage: '' })
    }
  }

  const handleSubmit = () => {
    let hasError = false;
    const fields = [
      { data: name, setData: setName, type: 'text' },
      { data: email, setData: setEmail, type: 'email' },
      { data: phone, setData: setPhone, type: 'tel' },
      { data: address, setData: setAddress, type: 'text' },
      { data: zip, setData: setZip, type: 'number' },
      { data: city, setData: setCity, type: 'text' },
      { data: country, setData: setCountry, type: 'text' },
    ]

    if (payment === 'eMoney') {
      fields.push({ data: eNum, setData: setENum, type: 'number' })
      fields.push({ data: ePin, setData: setEPin, type: 'number' })
    }

    fields.forEach((input) => {
      //Check number, tel or email doesn't already have errors
      if ((input.type === 'number' || input.type === 'tel' || input.type === 'email')
        && input.data.errMessage !== '') {
        input.setData(old => { return { value: old.value, error: true, errMessage: old.errMessage } })
        hasError = true;
        return;
      }

      //Check empty
      if (input.data.value.trim().length === 0) {
        input.setData({ value: '', error: true, errMessage: 'Required' })
        hasError = true;
      }
    })

    if (!hasError) {
      setPurchaseModal(true);
    }
  }
  return (
    <div className={common.appWrap}>
      <div className='fixed w-full h-full top-0 left-0 -z-30 bg-pLight-200' />
      <Link href={getPrevLink()} onClick={consumePrevLink}
        className='inline-block mt-4 xsm:mt-12 lg:mt-20 mb-6 lg:mb-[38px] text-base opacity-50 hover:underline'>Go back</Link>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-5 mb-24 xsm:mb-[116px] lg:mb-[140px]'>
        <form className='flex-1 bg-white rounded-lg p-6 xsm:px-7 xsm:py-[30px] lg:p-12 '>
          <h1 className='uppercase font-bold text-[1.75rem] xsm:text-[2rem] leading-[2.375rem] xsm:leading-9 lg:mt-[6px] mb-8 xsm:mb-10'>Checkout</h1>
          <h2 className={styles.subHeader}>Billing Details</h2>
          <div className='grid sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 xsm:mb-[54px]'>
            <FormField className={'flex flex-col relative'} id={'name'} label={'Name'}
              placeholder={'Alexei Ward'} inputType={'text'} data={name} setData={setName} />
            <FormField className={'flex flex-col relative'} id={'email'} label={'Email Address'}
              placeholder={'alexeiward@gmail.com'} inputType={'email'} data={email} setData={setEmail} />
            <FormField className={'flex flex-col relative'} id={'phone'} label={'Phone Number'}
              placeholder={'202-555-0136'} inputType={'tel'} data={phone} setData={setPhone} />
          </div>
          <h2 className={styles.subHeader}>Shipping Info</h2>
          <div className='grid sm:grid-cols-2 gap-x-4 gap-y-6 mb-8 xsm:mb-[60px]'>
            <FormField className={'flex flex-col sm:col-span-2 relative'} id={'address'} label={'Address'}
              placeholder={'1137 Williams Avenue'} inputType={'text'} data={address} setData={setAddress} />
            <FormField className={'flex flex-col relative'} id={'zip'} label={'Zip Code'}
              placeholder={'10001'} inputType={'number'} length={5} data={zip} setData={setZip} />
            <FormField className={'flex flex-col relative'} id={'city'} label={'City'}
              placeholder={'New York'} inputType={'text'} data={city} setData={setCity} />
            <FormField className={'flex flex-col relative'} id={'country'} label={'Country'}
              placeholder={'United States'} inputType={'text'} data={country} setData={setCountry} />
          </div>
          <h2 className={styles.subHeader}>Payment Details</h2>
          <div className='grid sm:grid-cols-2 gap-x-4 gap-y-6'>
            <div className='sm:col-span-2 grid sm:grid-cols-2 gap-x-4 gap-y-4 mb-2 xsm:mb-0'>
              <label className={`${styles.label} !mb-0 sm:row-span-2`} htmlFor='payMethod'>Payment Method</label>
              <div className={styles.inputWrapRadio}>
                <input className='absolute invisible' id='eMoney' type="radio" name='payMethod' value="eMoney" defaultChecked />
                <label className={`${styles.labelRadio}${payment === 'eMoney' ? ' ' + styles.activeRadio : ''}`}
                  onClick={() => handleSetPayment('eMoney')} htmlFor='eMoney'>e-Money</label>
              </div>
              <div className={styles.inputWrapRadio}>
                <input className='absolute invisible' id='cash' type="radio" name='payMethod' value="cash" />
                <label className={`${styles.labelRadio}${payment === 'cash' ? ' ' + styles.activeRadio : ''}`}
                  onClick={() => handleSetPayment('cash')} htmlFor='cash'>Cash on Delivery</label>
              </div>
            </div>
            {
              payment === 'eMoney' ?
                <>
                  <FormField className={'flex flex-col relative'} id={'moneyNumber'} label={'e-Money Number'}
                    placeholder={'238521993'} inputType={'number'} length={9} data={eNum} setData={setENum} />
                  <FormField className={'flex flex-col relative mb-2 xsm:mb-0'} id={'moneyPin'} label={'e-Money PIN'}
                    placeholder={'6891'} inputType={'number'} length={4} data={ePin} setData={setEPin} />
                </> :
                <div className='sm:col-span-2 mt-2 flex items-center'>
                  <CashOn />
                  <p className='flex-1 text-base opacity-50 ml-8 mb-2 xsm:mb-0'>
                    The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence.
                    Just make sure your address is correct so that your order will not be cancelled.
                  </p>
                </div>
            }
          </div>
        </form>
        <div className='lg:w-[350px]'>
          <div className='bg-white rounded-lg p-8'>
            <h1 className='uppercase font-bold text-lg leading-[1.5625rem] mb-8'>Summary</h1>
            <div className='mb-8 max-h-[240px] overflow-auto'>
              {
                cartItems.map((cartItem, index, arr) => {
                  return (
                    <div key={index} className={`flex gap-4 items-center${index + 1 === arr.length ? '' : ' mb-6'}`}>
                      <div className='w-16 h-16'>
                        <img className='w-full h-full object-cover rounded-lg' src={cartItem.cartImage} alt='Product thumbnail' />
                      </div>
                      <div className='flex-1'>
                        <div className='flex justify-between'>
                          <span className='uppercase font-bold text-base'>{cartItem.name}</span>
                          <p className={`font-bold text-base opacity-50${arr.length > 3 ? ' mr-3' : ''}`}>x{cartItem.quantity}</p>
                        </div>
                        <span className='text-[0.875rem] leading-[1.5625rem] font-bold opacity-50'>$ {cartItem.price.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='flex items-center mb-2'>
              <span className='flex-1 uppercase opacity-50 text-base'>Total</span>
              <span className='text-lg leading-[1.5625rem] font-bold'>$ {totalPrice.toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-2'>
              <span className='flex-1 uppercase opacity-50 text-base'>Shipping</span>
              <span className='text-lg leading-[1.5625rem] font-bold'>$ {shippingPrice.toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-6'>
              <span className='flex-1 uppercase opacity-50 text-base'>VAT (Included)</span>
              <span className='text-lg leading-[1.5625rem] font-bold'>$ {Math.round(totalPrice * 0.2).toLocaleString()}</span>
            </div>
            <div className='flex items-center mb-8'>
              <span className='flex-1 uppercase opacity-50 text-base'>Grand Total</span>
              <span className='text-lg leading-[1.5625rem] font-bold text-pOrange-200'>$ {(totalPrice + shippingPrice).toLocaleString()}</span>
            </div>
            <button className={`${common.buttonLinkOne} text-white text-center block w-full`} onClick={handleSubmit}>Continue & Pay</button>
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
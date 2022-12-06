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
import FormField from './FormField';

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
    <div className={commonStyles.appWrap}>
      <Link href={getPrevLink()} onClick={consumePrevLink} className='block mt-20 mb-14 font-medium opacity-50 hover:underline'>Go back</Link>
      <div className='flex gap-x-5 mb-36'>
        <form className='flex-1 bg-slate-100 p-12 rounded-lg'>
          <h1 className='uppercase font-bold text-[32px] mt-[6px] mb-10'>Checkout</h1>
          <h2 className={styles.subHeader}>Billing Details</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6 mb-12'>
            <FormField className={'flex flex-col relative'} id={'name'} label={'Name'}
              placeholder={'Alexei Ward'} inputType={'text'} data={name} setData={setName} />
            <FormField className={'flex flex-col relative'} id={'email'} label={'Email Address'}
              placeholder={'alexeiward@gmail.com'} inputType={'email'} data={email} setData={setEmail} />
            <FormField className={'flex flex-col relative'} id={'phone'} label={'Phone Number'}
              placeholder={'202-555-0136'} inputType={'tel'} data={phone} setData={setPhone} />
          </div>
          <h2 className={styles.subHeader}>Shipping Info</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6 mb-12'>
            <FormField className={'flex flex-col col-span-2 relative'} id={'address'} label={'Address'}
              placeholder={'1137 Williams Avenue'} inputType={'text'} data={address} setData={setAddress} />
            <FormField className={'flex flex-col relative'} id={'zip'} label={'Zip Code'}
              placeholder={'10001'} inputType={'number'} length={5} data={zip} setData={setZip} />
            <FormField className={'flex flex-col relative'} id={'city'} label={'City'}
              placeholder={'New York'} inputType={'text'} data={city} setData={setCity} />
            <FormField className={'flex flex-col relative'} id={'country'} label={'Country'}
              placeholder={'United States'} inputType={'text'} data={country} setData={setCountry} />
          </div>
          <h2 className={styles.subHeader}>Payment Details</h2>
          <div className='grid grid-cols-2 gap-x-4 gap-y-6'>
            <div className='col-span-2 grid grid-cols-2 gap-x-4 gap-y-4'>
              <label className={`${styles.label} !mb-0 row-span-2`} htmlFor='payMethod'>Payment Method</label>
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
                  <FormField className={'flex flex-col relative'} id={'moneyPin'} label={'e-Money PIN'}
                    placeholder={'6891'} inputType={'number'} length={4} data={ePin} setData={setEPin} />
                </> :
                <div className='col-span-2 mt-[7px] flex items-center'>
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
            <button className={`${commonStyles.buttonLinkOne} text-white text-center block w-full`} onClick={handleSubmit}>Continue & Pay</button>
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
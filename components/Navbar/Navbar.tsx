import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useStateContext } from '../../context/ContextWrap';
import { Categories } from '../../lib';
import common from '../common.module.scss'
import { Cart, Hamburger, Logo } from '../Icons';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  background: boolean,
  categories: Categories[]
}

const Navbar = ({ categories, background }: NavbarProps) => {
  const { cartItems, setShowCart } = useStateContext();

  const onShowCart = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowCart(true);
  }

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    setLoaded(true)
  })

  return (
    <div className={`text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center h-[90px] lg:h-24`}>
        {
          loaded && !isDesktop && <button><Hamburger /></button>
        }
        <Logo className='mx-auto xs:ml-11 lg:ml-0' />
        {
          loaded && isDesktop &&
          <nav className='flex justify-center absolute'>
            <Link key={20} className={`${common.navLink} tracking-[2px] mx-4`} href='/'>Home</Link>
            {categories.map((category, index) => {
              return <Link className={`${common.navLink} tracking-[2px] mx-4`} key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
            })}
          </nav>
        }
        <button className='p-1 relative' onClick={() => onShowCart()}>
          <Cart />
          {
            cartItems.length === 0 ? null :
              <span className='absolute -top-2 -right-2 bg-pOrange-200 rounded-full w-5 h-5 inline-block font-medium text-xs p-[2px]'>{cartItems.length}</span>
          }
        </button>
      </div>

    </div>
  )
}

export default Navbar;
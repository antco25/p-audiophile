import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../context/ContextWrap';
import { Categories } from '../../lib';
import common from '../common.module.scss'
import { Cart, Logo } from '../Icons';

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

  return (
    <div className={`text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center pt-7 pb-8`}>
        <Logo className='flex-1 my-1' />
        <nav className='flex justify-center absolute'>
          <Link key={20} className={`${common.navLink} mx-4`} href='/'>Home</Link>
          {categories.map((category, index) => {
            return <Link className={`${common.navLink} mx-4`} key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
          })}
        </nav>
        <button className='p-1 relative' onClick={() => onShowCart()}>
          <Cart />
          {
            cartItems.length === 0 ? null :
              <span className='absolute -top-2 -right-2 bg-orange-600 rounded-full w-5 h-5 inline-block font-medium text-xs p-[2px]'>{cartItems.length}</span>
          }

        </button>
      </div>

    </div>
  )
}

export default Navbar;
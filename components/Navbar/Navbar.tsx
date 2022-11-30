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
  const { setShowCart } = useStateContext();

  const onShowCart = () => {
    window.scrollTo(0,0);
    setShowCart(true);
  }

  return (
    <div className={`Navbar text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center pt-7 pb-8`}>
        <Logo className='flex-1 my-1' />
        <nav className='flex justify-center absolute'>
          <Link key={20} className={`${common.navLink} mx-4`} href='/'>Home</Link>
          {categories.map((category, index) => {
            return <Link className={`${common.navLink} mx-4`} key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
          })}
        </nav>
        <button className='p-1' onClick={() => onShowCart()}><Cart /></button>
      </div>

    </div>
  )
}

export default Navbar;
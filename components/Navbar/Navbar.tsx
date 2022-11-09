import Link from 'next/link';
import React from 'react';
import common from '../common.module.scss'
import { Cart, Logo } from '../Icons';

const categories = ['headphones', 'speakers', 'earphones'];

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  background: boolean
}

const Navbar = ({ background } : NavbarProps) => {
  return (
    <div className={`Navbar text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center pt-8 pb-9`}>
        <Logo className='flex-1'/>
        <nav className='flex justify-center absolute'>
          <Link className={`${common.navLink} mx-4`} href='/'>Home</Link>
          {categories.map((category, index) => {
            return <Link className={`${common.navLink} mx-4`} key={index} href={`/category/${category}`}>{category}</Link>
          })}
        </nav>
        <Cart />
      </div>

    </div>
  )
}

export default Navbar;
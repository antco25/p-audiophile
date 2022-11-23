import Link from 'next/link';
import React from 'react';
import { Categories } from '../../lib';
import common from '../common.module.scss'
import { Cart, Logo } from '../Icons';

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  background: boolean,
  categories: Categories[]
}

const Navbar = ({ categories, background } : NavbarProps) => {
  return (
    <div className={`Navbar text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center pt-8 pb-9`}>
        <Logo className='flex-1'/>
        <nav className='flex justify-center absolute'>
          <Link key={20} className={`${common.navLink} mx-4`} href='/'>Home</Link>
          {categories.map((category, index) => {
            return <Link className={`${common.navLink} mx-4`} key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
          })}
        </nav>
        <Cart />
      </div>

    </div>
  )
}

export default Navbar;
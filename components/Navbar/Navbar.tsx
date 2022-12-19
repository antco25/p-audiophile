import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useStateContext } from '../../context/ContextWrap';
import { Categories } from '../../lib';
import { CategoryCards } from '../CategoryCard';
import { Cart, Hamburger, Logo } from '../Icons';
import common from '../common.module.scss'
import styles from './Navbar.module.scss'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  background: boolean,
  categories: Categories[]
}

const Navbar = ({ categories, background }: NavbarProps) => {
  const { cartItems, setShowCart, showMenu, setShowMenu, showCart } = useStateContext();
  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    setLoaded(true)
  })

  useEffect(() => {
    if (isDesktop || showCart) {
      setShowMenu(false)
    }
  }, [isDesktop, showCart])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollYPosition = window.pageYOffset;

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [isDesktop, showCart])

  //Close menu on scroll
  let scrollYPosition = 0;
  const onScroll = useCallback(() => {
    const { pageYOffset, innerHeight } = window;
    if ((pageYOffset + innerHeight > 1000) && ((pageYOffset - scrollYPosition) > 0)) {
      setShowMenu(false);
    } else {
      scrollYPosition = pageYOffset;
    }
  }, []);

  const onShowCart = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowCart(true);
  }

  return (
    <div className={`text-white${background ? ' bg-black' : ''}`}>
      <div className={`${common.appWrap} flex justify-center items-center h-[90px] lg:h-24$`}>
        {
          loaded && !isDesktop && <button onClick={() => setShowMenu((old) => !old)}><Hamburger /></button>
        }
        <Link href='/' className='mx-auto xs:ml-11 lg:ml-0' onClick={() => setShowMenu(false)}><Logo /></Link>
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
      {
        showMenu &&
        <div className={`bg-black/40 text-black absolute h-[calc(100%_-_90px)] w-full min-w-[375px] top-[90px] left-0 z-20`}
          onClick={() => setShowMenu((old) => !old)}>
          <div className={`bg-white absolute top-0 w-full h-[750px] xsm:h-[340px] pt-8 xsm:pt-14 px-6 xsm:px-10${' ' + styles.menuAnimIn}`}
            onClick={(e) => { e.stopPropagation() }}>
            <CategoryCards categories={categories} onClick={() => setShowMenu((old) => !old)} />
          </div>
        </div>
      }

    </div>
  )
}

export default Navbar;
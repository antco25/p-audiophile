import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';
import common from '../common.module.scss';
import { Facebook, Instagram, Logo, Twitter } from '../Icons';
import { Categories } from '../../lib';

interface FooterProps {
  categories: Categories[]
}

const Footer = ({ categories }: FooterProps) => {
  return (
    <div className='bg-pGray text-white text-base'>
      <div className={`${common.appWrap} grid justify-items-center xsm:justify-items-start grid-cols-1 sm:grid-cols-2`}>
        <hr className='h-1 w-[101px] mb-12 xs:mb-14 lg:mb-[71px] bg-pOrange-200' />
        <Logo className='row-start-2 mb-12 xs:mb-8 lg:mb-9' />
        <nav className='text-center row-start-3 lg:row-start-2 lg:justify-self-end mb-8 lg:mb-0'>
          <Link className={`${common.navLink} block xsm:inline mb-4 xsm:mb-0`} href='/'>Home</Link>
          {
            categories.map((category, index) => {
              return <Link className={`${common.navLink} block xsm:inline xsm:ml-8 mb-4 xsm:mb-0`}
                key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
            })}
        </nav>
        <div className='row-start-4 lg:row-start-3 sm:col-span-4 lg:col-span-1 opacity-50 text-center xsm:text-left'>
          Audiophile is an all in one stop to fulfill your audio needs.
          We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
          Come and visit our demo facility - we’re open 7 days a week.
        </div>
        <div className={`${styles.socials} col-span-2 row-start-6 sm:row-start-5 lg:row-start-3 justify-self-center sm:justify-self-end lg:self-end 
        mb-[38px] xs:mb-12 lg:mb-0 sm:mt-20 lg:mt-0`}>
          <a href='https://www.facebook.com/'><Facebook className={styles.socialLink} /></a>
          <a href='https://twitter.com' className='ml-4'><Twitter className={styles.socialLink} /></a>
          <a href='https://www.instagram.com' className='ml-4'><Instagram className={styles.socialLink} /></a>
        </div>
        <div className='col-start-1 col-span-2 justify-self-center sm:justify-self-start row-start-5 lg:row-start-4 font-bold mt-12 sm:mt-20 lg:mt-14 mb-12 opacity-50'>
          Copyright 2022. All Rights Reserved
        </div>
      </div>
    </div>
  )
}

export default Footer
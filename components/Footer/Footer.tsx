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
    <div className='bg-black text-white'>
      <div className={`${common.appWrap} grid grid-row-4 grid-cols-2`}>
        <hr className='h-1 w-24 mb-16 bg-orange-500' />
        <Logo className='logo row-start-2 mb-9' />
        <nav className='row-start-2 justify-self-end'>
          <Link className={common.navLink} href='/'>Home</Link>
          {
            categories.map((category, index) => {
              return <Link className={`${common.navLink} ml-8`} key={index} href={`/category/${category.name.toLowerCase()}`}>{category.name}</Link>
            })}
        </nav>
        <div className='row-start-3 opacity-50'>
          Audiophile is an all in one stop to fulfill your audio needs.
          We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
          Come and visit our demo facility - we’re open 7 days a week.
        </div>
        <div className={`${styles.socials} row-start-3 justify-self-end self-end`}>
          <a href='https://www.facebook.com/'><Facebook className={styles.socialLink} /></a>
          <a href='https://twitter.com' className='ml-4'><Twitter className={styles.socialLink} /></a>
          <a href='https://www.instagram.com' className='ml-4'><Instagram className={styles.socialLink} /></a>
        </div>
        <div className='row-start-4 font-bold mt-14 mb-12 opacity-50'>Copyright 2022. All Rights Reserved</div>
      </div>
    </div>
  )
}

export default Footer
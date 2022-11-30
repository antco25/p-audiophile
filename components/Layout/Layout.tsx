import Head from 'next/head'
import React from 'react'
import { useStateContext } from '../../context/ContextWrap'
import CartModal from '../CartModal'
import Footer from '../Footer'
import Navbar from '../Navbar/Navbar'

interface Props {
    children?: React.ReactNode,
    categories: any
}

const Layout: React.FC<Props> = ({ categories, children }) => {
    const { showCart } = useStateContext();

    return (
        <div className='Layout'>
            <Head>
                <title>Audiophile</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <header>
                <Navbar categories={categories} background={true} />
                {showCart && <CartModal />}
            </header>
            <main>
                {children}
            </main>
            <Footer categories={categories} />
        </div>
    )
}

export default Layout
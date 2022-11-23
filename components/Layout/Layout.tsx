import Head from 'next/head'
import React from 'react'
import CartModal from '../CartModal'
import Footer from '../Footer'
import Navbar from '../Navbar/Navbar'

interface Props {
    children?: React.ReactNode,
    categories: any
}

//TODO: state
const cartOpen = false;

const Layout: React.FC<Props> = ({ categories, children }) => {
    return (
        <div className='Layout'>
            <Head>
                <title>Audiophile</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <header>
                <Navbar categories={categories} background={true} />
                {cartOpen && <CartModal />}
            </header>
            <main>
                {children}
            </main>
            <Footer categories={categories} />
        </div>
    )
}

export default Layout
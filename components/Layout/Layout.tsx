import Head from 'next/head'
import React from 'react'
import CartModal from '../CartModal'
import Footer from '../Footer'
import Navbar from '../Navbar/Navbar'

interface Props {
    children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div className='Layout'>
            <Head>
                <title>Audiophile</title>
                <link rel="icon" href="/favicon-32x32.png" />
            </Head>
            <header>
                <Navbar background={true} />
                <CartModal />
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
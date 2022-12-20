import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { ContextWrap } from '../context/ContextWrap'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextWrap>
      <Layout categories={pageProps.categories} currentRoute={pageProps.currentRoute}>
        <Component {...pageProps} />
      </Layout>
    </ContextWrap>
  )
}
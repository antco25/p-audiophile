import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout categories={pageProps.categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from '../components'

export default function App({ Component, pageProps }: AppProps) {

  console.log(pageProps, 'pageProps')
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

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

//TODO: Determine screen size from page, not individual components ?
//export type ScreenSize = 'desktop' | 'tablet' | 'mobile'
/**
 * TODO:
1. change screen size at page level not component level
2. Colors, slate
3. Change page title depending on page
 */
export enum ScreenSize {
  'DESKTOP',
  'TABLET',
  'MOBILE'
}
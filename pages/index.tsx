import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { BannerProps, CategoryCards, getBannerProps, HomeHeroBanner, InfoBannerCard, YX1BannerCard, ZX7BannerCard, ZX9BannerCard } from '../components';
import { Categories, client, formatCategories } from '../lib';
import { useStateContext } from '../context/ContextWrap';
import common from '../components/common.module.scss';
import { useMediaQuery } from 'react-responsive';
import { ScreenSize } from './_app';

export interface CommonPageProps {
  categories: Categories[],
}

interface HomeProps extends CommonPageProps {
  XX99IIData: BannerProps,
  ZX9Data: BannerProps,
  ZX7Data: BannerProps,
  YX1Data: BannerProps,
  InfoData: BannerProps,
}

const Home = ({ categories, XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData }: HomeProps) => {
  const { resetCart, setResetCart, removeAllCart, storeLink } = useStateContext();

  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  const isLargeTablet = useMediaQuery({ minWidth: 576 })
  const isTablet = useMediaQuery({ minWidth: 376 })
  const screenSizeA = (isDesktop ? ScreenSize.DESKTOP : isLargeTablet ? ScreenSize.TABLET : ScreenSize.MOBILE);
  const screenSizeB = (isDesktop ? ScreenSize.DESKTOP : isTablet ? ScreenSize.TABLET : ScreenSize.MOBILE);

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    storeLink('/', true)

    if (resetCart) {
      setResetCart(false);
      removeAllCart();
    }
  }, [])

  return (
    <div className={common.appWrap}>
      <hr className={`$border-white opacity-20`} />
      <HomeHeroBanner data={XX99IIData.data} screenSize={screenSizeB} loaded={loaded} />
      <CategoryCards categories={categories} className='mt-28' />
      <ZX9BannerCard className='mt-[120px] xs:mt-24 lg:mt-[168px]' data={ZX9Data.data} screenSize={screenSizeA} loaded={loaded} />
      <ZX7BannerCard className='mt-6 xs:mt-8 lg:mt-12' data={ZX7Data.data} screenSize={screenSizeA} loaded={loaded} />
      <YX1BannerCard className='mt-6 xs:mt-8 lg:mt-12' data={YX1Data.data} screenSize={screenSizeB} loaded={loaded}/>
      <InfoBannerCard className='my-[120px] xs:my-24 lg:my-[200px]' data={InfoData.data} screenSize={screenSizeB} loaded={loaded} />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const categoryQuery = `*[_type == "category"] | order(order)`;
  const categories = formatCategories(await client.fetch(categoryQuery));

  const query = `*[_type == "banner"] | order(name) { ..., product->{slug} }`;
  const results = await client.fetch(query);

  const InfoData = getBannerProps(results[0])
  const XX99IIData = getBannerProps(results[1])
  const YX1Data = getBannerProps(results[2])
  const ZX7Data = getBannerProps(results[3])
  const ZX9Data = getBannerProps(results[4])

  const currentRoute = '/'

  return {
    props: { categories, XX99IIData, ZX9Data, ZX7Data, YX1Data, InfoData, currentRoute }
  }
}


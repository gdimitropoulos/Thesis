import '../styles/globals.css'
import 'antd/dist/antd.css';
import Head from 'next/head';
import AppFooter from '../components/AppFooter';
import AppHeader from '../components/AppHeader';


function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>Παν. Πατρων</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppHeader />
      <Component {...pageProps} />
      <AppFooter />
  </>)
}

export default MyApp

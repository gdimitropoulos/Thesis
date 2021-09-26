import '../styles/globals.css'
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import AppFooter from '../components/AppFooter';
import theme from '../src/theme';
import AppHeader from '../components/AppHeader';
import createEmotionCache from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <>
       <CacheProvider value={emotionCache}>
     <Head>
        <title>Παν. Πατρων</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
      <AppHeader />
      <Component {...pageProps} />
      <AppFooter />
      </ThemeProvider>
      </CacheProvider>
  </>)
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp

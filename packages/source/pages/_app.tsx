import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;

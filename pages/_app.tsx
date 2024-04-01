import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RITASIG</title>
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;

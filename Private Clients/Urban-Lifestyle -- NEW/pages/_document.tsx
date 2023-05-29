/*
  Replaces the default _document page
*/

import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const Document = () => (
  <Html>
    <Head>
      <meta name='description' content='Base app version 2 includes pwa capable' />
      <meta name='theme-color' content='#333333' />
      <meta name='referrer' content={'strict-origin'} />

      <link rel='icon' type='image/x-icon' href='/icons/favicon.ico' />
      <link rel='shortcut icon' type='image/x-icon' href='/icons/favicon.ico' />
      <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png'></link>
      <link rel='manifest' href='/site.webmanifest' />
    </Head>

    <body className='bg-light-400 dark:bg-dark-800 text-primary-900 dark:text-primary-100'>
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}></Script>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

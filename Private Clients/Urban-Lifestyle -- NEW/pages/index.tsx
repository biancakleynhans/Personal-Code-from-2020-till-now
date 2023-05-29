/*
  SAME AS THE NORMAL REACT JS APP.TSX FILE 2
  this is the home page first page rendered when visiting your site 
*/

import React from 'react';
import Head from 'next/head';
import OnlineShopLanding from '../components/layouts/OnlineShopLanding';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ecomms and point of sale system</title>
        <meta name='description' content='Ecomms and point of sale system' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <OnlineShopLanding />
    </div>
  );
}

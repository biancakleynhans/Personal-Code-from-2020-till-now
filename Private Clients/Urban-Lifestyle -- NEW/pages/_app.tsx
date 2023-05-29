/* 
  SAME AS THE NORMAL REACT JS INDEX.TSX FILE LAYER 1
  HERE IS WHERE ROUTING HEADER AND FOOTER WILL BE SET UP AS WELL AS 
  MOBILE MENU, THEME EC.
*/

import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import AppShell from '../components/shared/AppShell';

// Contexts
import AuthProvider from '../context/AuthContext';

/* tailwind css imports*/
import 'tailwindcss/tailwind.css';

/*personal css imports */
import '../styles/globals.css';
import '../styles/popupStyle.css';
import ProductsDataProvider from '../context/ProductsContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
      </Head>

      {/* Theme */}
      <ThemeProvider attribute='class'>
        {/* Auth Provider */}
        <AuthProvider>
          {/* Products */}
          <ProductsDataProvider>
            {/* Application */}
            {router.pathname.includes('auth') ? (
              <div className='h-screen w-screen flex flex-col justify-center content-center items-center '>
                <Component {...pageProps} />
              </div>
            ) : (
              <AppShell Component={Component} pageProps={pageProps} />
            )}
          </ProductsDataProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

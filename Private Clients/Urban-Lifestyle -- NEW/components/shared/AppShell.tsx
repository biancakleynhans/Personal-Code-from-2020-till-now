import React from 'react';
import FooterBar from './headers_footers/FooterBar';
import HeaderBar from './headers_footers/HeaderBar';

interface iProps {
  Component: any;
  pageProps: any;
}

function AppShell(props: iProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <div className='flex flex-col h-screen'>
        <header className='w-full sticky top-0'>
          <HeaderBar />
        </header>
        <main className='flex-1 overflow-y-scroll'>
          <Component {...pageProps} />
          <div className='mb-20'></div>
        </main>

        <FooterBar />
      </div>
    </>
  );
}

export default AppShell;

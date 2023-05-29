// THIS IS LIKE THE DEFAULT INDEX.JS IN A NORMAL REACT PROJECT

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/nav/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

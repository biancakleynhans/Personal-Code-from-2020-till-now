import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  return (
    <>
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`} onLoad={() => setGoogleApiLoaded(true)}></Script>
      {googleApiLoaded && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;

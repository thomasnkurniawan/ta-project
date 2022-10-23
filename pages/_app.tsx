import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <AuthUserProvider> <Component {...pageProps} /></AuthUserProvider>
}

export default MyApp

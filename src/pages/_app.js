import { AuthProvider, UserProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

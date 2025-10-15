'use client';

import 'focus-visible/dist/focus-visible';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '~/lib/components/ChakraProvider';
import ReduxProvider from '../redux/ReduxProvider';
import { SessionProvider } from 'next-auth/react';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <ReduxProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default AppProviders;

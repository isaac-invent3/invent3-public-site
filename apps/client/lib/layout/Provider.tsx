'use client';

import { useEffect, useState } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '~/lib/components/ChakraProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default AppProviders;

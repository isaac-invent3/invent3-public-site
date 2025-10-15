'use client';

import 'focus-visible/dist/focus-visible';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@/lib/components/ChakraProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ChakraProvider>{children}</ChakraProvider>;
};

export default AppProviders;

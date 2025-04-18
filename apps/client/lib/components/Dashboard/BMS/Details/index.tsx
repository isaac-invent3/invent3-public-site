'use client';

import { VStack } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import Info from './Info';
import DetailTabs from './DetailTabs';

const BMSDetails = () => {
  return (
    <VStack
      width="full"
      spacing={{ base: '24px', lg: '40px' }}
      px={{ base: '16px', lg: 0 }}
      pb="26px"
    >
      <Header />
      <Info />
      <DetailTabs />
    </VStack>
  );
};

export default BMSDetails;

'use client';

import React from 'react';
import PageHeader from '../../UI/PageHeader';
import { Flex, VStack } from '@chakra-ui/react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';

const AssetLifeCycleDashboard = () => {
  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      gap="28px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>Asset Lifecycle Dashboard</PageHeader>
      <VStack width="full" spacing="16px" alignItems="flex-start">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
      </VStack>
    </Flex>
  );
};

export default AssetLifeCycleDashboard;

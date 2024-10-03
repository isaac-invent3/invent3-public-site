import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import QuickLinks from './QuickLinks';
import AssetCountStats from './AssetCountStats';

const SectionOne = () => {
  return (
    <SimpleGrid width="full" columns={2} gap="16px">
      <QuickLinks />
      <AssetCountStats />
    </SimpleGrid>
  );
};

export default SectionOne;

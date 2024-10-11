import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Plan from './Plan';
import Asset from './Asset';
import AssetLocation from './AssetLocation';

const SectionOne = () => {
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Asset />
        <AssetLocation />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="40px"
      >
        <Plan />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionOne;

import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import VendorInfo from './VendorInfo';
import ContractDetails from './ContractDetails';

const SectionTwo = () => {
  return (
    <SimpleGrid width="full" columns={2} gap="57px">
      <VendorInfo />
      <ContractDetails />
    </SimpleGrid>
  );
};

export default SectionTwo;

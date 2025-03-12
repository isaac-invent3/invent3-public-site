import { SimpleGrid } from '@chakra-ui/react';
import ContractDetails from './ContractDetails';
import VendorInfo from './VendorInfo';

const SectionTwo = () => {
  return (
    <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap="57px">
      <VendorInfo />
      <ContractDetails />
    </SimpleGrid>
  );
};

export default SectionTwo;

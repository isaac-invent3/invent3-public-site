import { VStack } from '@chakra-ui/react';
import React from 'react';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';

const AcquisitionTab = () => {
  return (
    <VStack width="full" spacing="40px" my="24px">
      <InfoOne />
      <InfoTwo />
    </VStack>
  );
};

export default AcquisitionTab;

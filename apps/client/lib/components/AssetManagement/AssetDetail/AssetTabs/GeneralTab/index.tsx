import { VStack } from '@chakra-ui/react';
import React from 'react';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo.tsx';

const GeneralTab = () => {
  return (
    <VStack spacing="33px" my="24px">
      <InfoOne />
      <InfoTwo />
    </VStack>
  );
};

export default GeneralTab;

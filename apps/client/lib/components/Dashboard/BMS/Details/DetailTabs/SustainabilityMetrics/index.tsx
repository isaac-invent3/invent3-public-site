import { VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';

const SustainabilityMetrics = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
    </VStack>
  );
};

export default SustainabilityMetrics;

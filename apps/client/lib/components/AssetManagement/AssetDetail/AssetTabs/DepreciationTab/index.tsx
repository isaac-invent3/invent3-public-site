import { Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import ReplacementForecast from './ReplacementForecast';
import KeyDrivers from './KeyDrivers';
import Depreciation from './Depreciation';
import DepreciationHistory from './DepreciationHistory';

const DepreciationTab = () => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '16px', lg: '42px' }}
      bgColor="white"
      p={{ base: '8px', lg: '16px' }}
      rounded="8px"
      width="full"
      mt="9px"
    >
      <VStack width={{ base: 'full', lg: '60%' }} spacing="40px">
        <Depreciation />
        <DepreciationHistory />
      </VStack>
      <VStack width={{ base: 'full', lg: '40%' }} spacing="24px">
        <ReplacementForecast />
        <KeyDrivers />
      </VStack>
    </Stack>
  );
};

export default DepreciationTab;

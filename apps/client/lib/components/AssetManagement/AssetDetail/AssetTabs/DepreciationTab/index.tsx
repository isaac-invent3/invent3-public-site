import { Stack } from '@chakra-ui/react';
import React from 'react';
import Forecast from './Forecast';
import DepreciationDetails from './DepreciationDetails';

const DepreciationTab = () => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '16px', lg: '42px' }}
      bgColor="white"
      p={{ base: '16px' }}
      rounded="8px"
      width="full"
      mt="9px"
    >
      <DepreciationDetails />
      <Forecast />
    </Stack>
  );
};

export default DepreciationTab;

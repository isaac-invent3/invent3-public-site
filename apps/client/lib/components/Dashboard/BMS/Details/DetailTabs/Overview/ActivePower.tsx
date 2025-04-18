import React from 'react';
import { Stack } from '@chakra-ui/react';
import InfoCard from '../../../InfoCard';

const ActivePower = () => {
  return (
    <InfoCard
      title="Active Power"
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack width="full" direction={{ base: 'column', lg: 'row' }}></Stack>
    </InfoCard>
  );
};

export default ActivePower;

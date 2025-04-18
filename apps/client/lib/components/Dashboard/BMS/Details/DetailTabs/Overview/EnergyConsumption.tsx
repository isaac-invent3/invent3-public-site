import React from 'react';
import { Stack } from '@chakra-ui/react';
import InfoCard from '../../../InfoCard';

const EnergyConsumption = () => {
  return (
    <InfoCard
      title="Energy Consumption"
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack width="full" direction={{ base: 'column', lg: 'row' }}></Stack>
    </InfoCard>
  );
};

export default EnergyConsumption;

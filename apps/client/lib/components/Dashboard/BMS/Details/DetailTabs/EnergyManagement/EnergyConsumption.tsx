import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex } from '@chakra-ui/react';

const EnergyConsumption = () => {
  return (
    <InfoCard
      title="Energy Trends"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <Flex />
    </InfoCard>
  );
};

export default EnergyConsumption;

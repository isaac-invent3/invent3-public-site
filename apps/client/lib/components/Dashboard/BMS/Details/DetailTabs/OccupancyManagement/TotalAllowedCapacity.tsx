import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex } from '@chakra-ui/react';

const TotalAllowedCapacity = () => {
  return (
    <InfoCard
      title="Total Allowed Capacity"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <Flex />
    </InfoCard>
  );
};

export default TotalAllowedCapacity;

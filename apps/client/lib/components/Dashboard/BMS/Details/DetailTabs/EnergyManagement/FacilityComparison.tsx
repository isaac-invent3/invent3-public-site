import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex } from '@chakra-ui/react';

const FacilityComparison = () => {
  return (
    <InfoCard
      title="Facility Comparison"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <Flex />
    </InfoCard>
  );
};

export default FacilityComparison;

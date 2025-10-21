import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import LifeCycleCostCurve from './LifeCycleCostCurve';
import RiskOverTime from './RiskOverTime';

const Graphs = () => {
  return (
    <SimpleGrid
      width="full"
      gap={{ base: '16px', lg: '32px' }}
      columns={{ base: 1, lg: 2 }}
    >
      <LifeCycleCostCurve />
      <RiskOverTime />
    </SimpleGrid>
  );
};

export default Graphs;

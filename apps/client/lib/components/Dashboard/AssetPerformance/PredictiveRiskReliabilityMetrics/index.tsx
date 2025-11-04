import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import PredictiveRiskLevels from './PredictiveRiskLevels';
import ReliabilityMetrics from './ReliabilityMetrics';

const PredictiveRiskReliabilityMetrics = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <PredictiveRiskLevels />
      <ReliabilityMetrics />
    </SimpleGrid>
  );
};

export default PredictiveRiskReliabilityMetrics;

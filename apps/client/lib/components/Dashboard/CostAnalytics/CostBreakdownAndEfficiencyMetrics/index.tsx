import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CostBreakDownByType from './CostBreakDownByType';
import ROIAndEfficiencyMetrics from './ROIAndEfficiencyMetrics';

const CostBreakdownAndEfficiencyMetrics = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <CostBreakDownByType />
      <ROIAndEfficiencyMetrics />
    </SimpleGrid>
  );
};

export default CostBreakdownAndEfficiencyMetrics;

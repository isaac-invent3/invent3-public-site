import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import MonthlyCostTrend from './MonthlyCostTrend';
import FacilitiesByTotalCost from './FacilitiesByTotalCost';

const MonthyCostTrendAndFacilitiesByCost = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <MonthlyCostTrend />
      <FacilitiesByTotalCost />
    </SimpleGrid>
  );
};

export default MonthyCostTrendAndFacilitiesByCost;

import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import PieChartWithInfo from './PieChartWIthInfo';

const PieChartStats = () => {
  const data = [
    { label: 'Under Maintenance', mainValue: 8200, totalValue: 17000 },
    { label: 'Schedule for Maintenance', mainValue: 10200, totalValue: 18000 },
    { label: 'Pending Disposal', mainValue: 16200, totalValue: 19000 },
    { label: 'Out of Service', mainValue: 16200, totalValue: 20000 },
  ];

  return (
    <SimpleGrid columns={2} width="full" gap="16px">
      {data.map((item, index) => (
        <PieChartWithInfo {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default PieChartStats;

import { SimpleGrid } from '@chakra-ui/react';
import { icon } from 'leaflet';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';

const Summary = () => {
  const summaryData = [
    {
      title: 'Total Energy Cost',
      value: '$32,546',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Forecasted Energy Cost',
      value: '$60,800',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Maintenance Cost',
      value: '$12,560',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Energy Savings (vs Baseline)',
      value: '20%',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
  ];

  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2, lg: 4 }}>
      {summaryData.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

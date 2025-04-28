import { SimpleGrid } from '@chakra-ui/react';
import { icon } from 'leaflet';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';

const Summary = () => {
  const summaryData = [
    {
      title: 'Total Maintenance',
      value: '300',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Scheduled Maintenance',
      value: '5',
      subtitle: 'This week',
      icon: '/adjust.png',
    },
    {
      title: 'Peak Demand',
      value: '100MW',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Real Time Power Usage',
      value: '80kW',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
  ];

  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2 }}
      bgColor="#F2F1F1"
      p="8px"
      rounded="8px"
    >
      {summaryData.map((item, index) => (
        <SummaryCard
          {...item}
          key={index}
          containerStyle={{ bgColor: 'white' }}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

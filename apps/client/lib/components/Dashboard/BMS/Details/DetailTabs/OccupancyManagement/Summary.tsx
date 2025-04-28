import { SimpleGrid } from '@chakra-ui/react';
import { icon } from 'leaflet';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';

const Summary = () => {
  const summaryData = [
    {
      title: 'Total Zones',
      value: '4',
      subtitle: 'No of Zones',
      icon: '/location.png',
    },
    {
      title: 'Current Occupancy',
      value: '400',
      subtitle: 'People in All zones',
      icon: '/clock.png',
    },
    {
      title: 'Occupancy Rate',
      value: '90%',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Occupancy Sensor Health',
      value: 'Normal',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Occupancy vs Capacity',
      value: '39%',
      subtitle: 'This Week',
      icon: '/bms-calendar.png',
    },
  ];

  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
    >
      {summaryData.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

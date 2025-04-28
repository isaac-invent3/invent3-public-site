import React from 'react';
import InfoCard from '../../../InfoCard';
import { SimpleGrid } from '@chakra-ui/react';
import SummaryCard from '../../../Common/SummaryCard';

const Summary = () => {
  const content = [
    {
      title: 'Current Temperature',
      subtitle: 'All zones',
      value: '98oC',
      icon: '/adjust.png',
      isLoading: false,
    },
    {
      title: 'Humidity',
      subtitle: 'All zones',
      value: '80%RH',
      icon: '/adjust.png',
      isLoading: false,
    },
    {
      title: 'COs Level',
      subtitle: 'All zones',
      value: '35PPM',
      icon: '/adjust.png',
      isLoading: false,
    },
  ];
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 3 }}>
      {content.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

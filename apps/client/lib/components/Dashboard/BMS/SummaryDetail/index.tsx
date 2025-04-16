import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryInfoCard from './SummaryInfoCard';

const SummaryDetail = () => {
  const content = [
    {
      title: 'Highest Occupancy Rate',
      icon: '/speedometer.gif',
      children: null,
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Most System Failures',
      icon: '/terrorism.gif',
      children: null,
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Highest Non-Compliant',
      icon: '/will.gif',
      children: null,
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Highest Cost Location',
      icon: '/will.gif',
      children: null,
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
  ];
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 2, lg: 4 }}>
      {content.map((item, index) => (
        <SummaryInfoCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default SummaryDetail;

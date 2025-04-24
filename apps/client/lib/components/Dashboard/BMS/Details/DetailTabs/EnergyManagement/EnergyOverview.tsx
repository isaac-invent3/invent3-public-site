import React from 'react';
import InfoCard from '../../../InfoCard';
import { SimpleGrid } from '@chakra-ui/react';
import SummaryCard from '../../../Common/SummaryCard';

const EnergyOverview = () => {
  const content = [
    {
      title: 'Total Energy Consumption',
      subtitle: 'All zones',
      value: '35,000kWh',
      icon: '/adjust.png',
      isLoading: false,
    },
    {
      title: 'Energy Use Intensity',
      subtitle: 'All zones',
      value: '90kW/h',
      icon: '/adjust.png',
      isLoading: false,
    },
    {
      title: 'Peak Demand',
      subtitle: 'All zones',
      value: '100MW',
      icon: '/adjust.png',
      isLoading: false,
    },
    {
      title: 'Real Time Power Usage',
      subtitle: 'All zones',
      value: '80kW',
      icon: '/adjust.png',
      isLoading: false,
    },
  ];
  return (
    <InfoCard
      title="Energy Overview"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2 }}>
        {content.map((item, index) => (
          <SummaryCard
            {...item}
            key={index}
            containerStyle={{ bgColor: 'white' }}
          />
        ))}
      </SimpleGrid>
    </InfoCard>
  );
};

export default EnergyOverview;

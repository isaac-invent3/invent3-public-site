import { SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '~/lib/components/CustomIcons';
import SummaryCard from '~/lib/components/Dashboard/Common/Summaries/SummaryCardWithPercentChange';

const Summary = () => {
  const summaryData = [
    {
      label: 'Total Active Technicians',
      value: 24,
    },
    {
      label: 'Average Current Load',
      value: 4.2,
    },
    {
      label: 'Unassigned Tickets',
      value: 12,
    },
    {
      label: 'Balancing Efficiency',
      value: '91%',
    },
  ];

  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="14px">
      {summaryData?.map((item, index) => (
        <SummaryCard
          title={item.label}
          icon={AssetBoxIcon}
          value={item.value ?? 'N/A'}
          isLoading={false}
          showRange={false}
          key={index}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

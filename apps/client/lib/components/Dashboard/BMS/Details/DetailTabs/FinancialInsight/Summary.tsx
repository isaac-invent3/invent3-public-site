import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSFinancialInsightsOverviewQuery } from '~/lib/redux/services/dashboard/bms.services';
import { amountFormatter } from '~/lib/utils/Formatters';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSFinancialInsightsOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );

  const summaryData = [
    {
      title: 'Total Energy Cost',
      value: data?.data?.totalEnergyCost
        ? (amountFormatter(data?.data?.totalEnergyCost) as unknown as string)
        : '-',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Forecasted Energy Cost',
      value: data?.data?.forcastEnergyCost
        ? (amountFormatter(data?.data?.forcastEnergyCost) as unknown as string)
        : '-',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Maintenance Cost',
      value: data?.data?.maintenanceCost
        ? (amountFormatter(data?.data?.maintenanceCost) as unknown as string)
        : '-',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
    {
      title: 'Energy Savings (vs Baseline)',
      value: data?.data?.energySavingsVBaseline
        ? (amountFormatter(
            data?.data?.energySavingsVBaseline
          ) as unknown as string)
        : '-',
      subtitle: 'Of All Zones',
      icon: '/location.png',
    },
  ];

  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2, lg: 4 }}>
      {summaryData.map((item, index) => (
        <SummaryCard {...item} key={index} isLoading={isLoading} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

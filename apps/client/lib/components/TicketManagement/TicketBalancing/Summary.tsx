import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { AssetBoxIcon } from '~/lib/components/CustomIcons';
import SummaryCard from '~/lib/components/Dashboard/Common/Summaries/SummaryCardWithPercentChange';
import { useGetTicketLoadBalancingSummaryQuery } from '~/lib/redux/services/ticket.services';

const Summary = () => {
  const { data, isLoading } = useGetTicketLoadBalancingSummaryQuery();

  const summaryData = [
    {
      label: 'Total Active Technicians',
      value: data?.data?.totalActiveTechnicians,
    },
    {
      label: 'Average Current Load',
      value: data?.data?.averageCurrentLoad,
      suffix: 'Tickets',
    },
    {
      label: 'Unassigned Tickets',
      value: data?.data?.unassignedTickets,
    },
    {
      label: 'Balancing Efficiency',
      value: `${data?.data?.balancingEfficiency ?? 0}%`,
    },
  ];

  return (
    <SimpleGrid columns={{ base: 2, lg: 4 }} spacing="14px">
      {summaryData?.map((item, index) => (
        <SummaryCard
          title={item.label}
          icon={AssetBoxIcon}
          value={item.value ?? 'N/A'}
          isLoading={isLoading}
          showRange={item?.suffix ? true : false}
          key={index}
          rangeText={item?.suffix}
          rangeStyle={{
            color: 'primary.500',
            fontWeight: 800,
            fontSize: { base: '14px', lg: '24px' },
          }}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSPredictiveMaintenanceOverviewQuery } from '~/lib/redux/services/dashboard/bms.services';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSPredictiveMaintenanceOverviewQuery(
    { facilityId: id },
    { skip: !id }
  );

  const summaryData = [
    {
      title: 'Total Maintenance',
      value: data?.data?.totalMaintenance?.toLocaleString() ?? '-',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Scheduled Maintenance',
      value: data?.data?.scheduledMaintenance?.toLocaleString() ?? '-',
      subtitle: 'This week',
      icon: '/adjust.png',
    },
    {
      title: 'Peak Demand',
      value: `${data?.data?.peakDemand?.toLocaleString() ?? '-'}MW`,
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Real Time Power Usage',
      value: `${data?.data?.realTimePowerUsage?.toLocaleString() ?? '-'}kW`,
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
          isLoading={isLoading}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSOccupancyManagementQuery } from '~/lib/redux/services/dashboard/bms.services';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSOccupancyManagementQuery(
    { facilityId: id },
    { skip: !id }
  );

  const summaryData = [
    {
      title: 'Total Zones',
      value: data?.data?.totalZones ?? '-',
      subtitle: 'No of Zones',
      icon: '/location.png',
    },
    {
      title: 'Current Occupancy',
      value: data?.data?.currentOccupancy ?? '-',
      subtitle: 'People in All zones',
      icon: '/clock.png',
    },
    {
      title: 'Occupancy Rate',
      value: data?.data?.occupancyRate ?? '-',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Occupancy Sensor Health',
      value: data?.data?.occupancySensorHealth ?? '-',
      subtitle: 'All zones',
      icon: '/adjust.png',
    },
    {
      title: 'Occupancy vs Capacity',
      value: data?.data?.occupancyVsCapacity ?? '-',
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
        <SummaryCard {...item} key={index} isLoading={isLoading} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

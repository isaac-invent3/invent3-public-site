import { SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  useGetBMSAverageMaintenanceTimeQuery,
  useGetBMSOccupanyRateQuery,
  useGetBMSScheduledMaintenanceQuery,
  useGetBMSTotalFaultsDetectedQuery,
} from '~/lib/redux/services/dashboard/bms.services';
import SummaryCard from '../../../Common/SummaryCard';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data: occupancyRateData, isLoading: isLoadingOccupancyRate } =
    useGetBMSOccupanyRateQuery({ facilityId: id }, { skip: !id });
  const {
    data: averageMaintenanceData,
    isLoading: isLoadingAverageMaintenance,
  } = useGetBMSAverageMaintenanceTimeQuery({ facilityId: id }, { skip: !id });
  const {
    data: scheduleMaintenanceData,
    isLoading: isLoadingScheduleMaintenanceData,
  } = useGetBMSScheduledMaintenanceQuery({ facilityId: id }, { skip: !id });
  const { data: totalFaultData, isLoading: isLoadingTotalFaultData } =
    useGetBMSTotalFaultsDetectedQuery({ facilityId: id }, { skip: !id });

  const content = [
    {
      title: 'Occupancy Rate',
      subtitle: 'All zones',
      value: '90%',
      icon: '/adjust.png',
      isLoading: isLoadingOccupancyRate,
    },
    {
      title: 'Total Zones',
      subtitle: 'No of Zones',
      value: averageMaintenanceData?.data?.totalZones ?? '-',
      icon: '/location.png',
      isLoading: isLoadingAverageMaintenance,
    },
    {
      title: 'Avg Maintenance Time',
      subtitle: 'All zones',
      value: `${averageMaintenanceData?.data?.averageMaintenanceTime} ${averageMaintenanceData?.data?.unit}`,
      icon: '/clock.png',
      isLoading: isLoadingAverageMaintenance,
    },
    {
      title: 'Total  Faults Detetcted',
      subtitle: 'No of Faults',
      value: '3 Faults',
      icon: '/fault.png',
      isLoading: isLoadingTotalFaultData,
    },
    {
      title: 'Scheduled Maintenance',
      subtitle: 'This Week',
      value: scheduleMaintenanceData?.data?.scheduledMaintenance ?? '-',
      icon: '/bms-calendar.png',
      isLoading: isLoadingScheduleMaintenanceData,
    },
  ];
  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
    >
      {content.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

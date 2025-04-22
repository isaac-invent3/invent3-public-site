import {
  Flex,
  HStack,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  useGetBMSAverageMaintenanceTimeQuery,
  useGetBMSOccupanyRateQuery,
  useGetBMSScheduledMaintenanceQuery,
  useGetBMSTotalFaultsDetectedQuery,
} from '~/lib/redux/services/dashboard/bms.services';

interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  icon: string;
  isLoading: boolean;
}
const SummaryCard = (props: SummaryCardProps) => {
  const { title, subtitle, value, icon, isLoading } = props;
  return (
    <VStack
      width="full"
      spacing="16px"
      alignItems="flex-start"
      rounded="8px"
      bgColor="neutral.200"
      p="16px"
    >
      <HStack width="full" justifyContent="space-between" spacing="24px">
        <Text color="neutral.800" fontWeight={800} size="md">
          {title}
        </Text>
        <Flex position="relative" width="24px" height="24px">
          <Image src={icon} alt="icon" fill />
        </Flex>
      </HStack>
      <VStack alignItems="flex-start" spacing="8px">
        <Skeleton isLoaded={!isLoading}>
          <Text fontWeight={800} size="xl">
            {value}
          </Text>
        </Skeleton>
        <Text color="neutral.600">{subtitle}</Text>
      </VStack>
    </VStack>
  );
};

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
      value: averageMaintenanceData?.data?.averageMaintenanceTime
        ? `${averageMaintenanceData?.data?.averageMaintenanceTime} ${averageMaintenanceData?.data?.unit}`
        : '-',
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

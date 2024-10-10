import { VStack } from '@chakra-ui/react';
import React from 'react';
import GeneralStats from './GeneralStats';
import StatusCount from './StatusCount';
import { useGetMaintenanceScheduleStatsQuery } from '~/lib/redux/services/maintenance/schedule.services';

const ScheduleStats = () => {
  const { data, isLoading } = useGetMaintenanceScheduleStatsQuery({ id: 1 });
  return (
    <VStack width="full" spacing="16px">
      <GeneralStats isLoading={isLoading} data={data?.data} />
      <StatusCount isLoading={isLoading} data={data?.data} />
    </VStack>
  );
};

export default ScheduleStats;

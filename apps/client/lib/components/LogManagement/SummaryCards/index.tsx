import { SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import {
  MaintenanceIcon,
  TaskIcon,
  TicketIcon,
} from '../../CustomIcons/Dashboard';
import { useGetAuditRecordSummaryQuery } from '~/lib/redux/services/log.services';

const SummaryCards = () => {
  const { data, isLoading } = useGetAuditRecordSummaryQuery();
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, sm: 2, lg: 4 }}>
      <SummaryCardWrapper
        title="Total Logs Recorded"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
        isLoading={isLoading}
        count={data?.data?.totalAuditsRecorded}
      />
      <SummaryCardWrapper
        title="Critical Events"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
        isLoading={isLoading}
        count={data?.data?.criticalEvents}
        customCountStyle={{ color: 'red.500' }}
      />
      <SummaryCardWrapper
        title="Most Active Users"
        icon={MaintenanceIcon}
        containerStyle={{ minH: '164px' }}
        isLoading={isLoading}
        count={data?.data?.mostActiveUsers}
      />
      <SummaryCardWrapper
        title="Recent Alerts"
        icon={TaskIcon}
        containerStyle={{ minH: '164px' }}
        isLoading={isLoading}
        count={data?.data?.recentAlerts}
      />
    </SimpleGrid>
  );
};

export default SummaryCards;

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
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <Text size="xl" fontWeight={800} color="primary.500">
            {data?.data?.totalAuditsRecorded}
          </Text>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Critical Events"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <Text size="xl" fontWeight={800} color="red.500">
            {data?.data?.criticalEvents}
          </Text>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Most Active Users"
        icon={MaintenanceIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <Text size="xl" fontWeight={800} color="primary.500">
            {data?.data?.mostActiveUsers}
          </Text>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Recent Alerts"
        icon={TaskIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <Text size="xl" fontWeight={800} color="primary.500">
            {data?.data?.recentAlerts}
          </Text>
        </Skeleton>
      </SummaryCardWrapper>
    </SimpleGrid>
  );
};

export default SummaryCards;

import { HStack, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import {
  AssetBoxIcon,
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
        title="Total Compliance Certificate"
        icon={TicketIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <HStack alignItems="flex-end">
            <Text size="xl" fontWeight={800} color="primary.500">
              {data?.data?.totalAuditsRecorded}
            </Text>
            <Text color="neutral.600" mb="4px" fontWeight={700}>
              Active Certifications
            </Text>
          </HStack>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Non compliant Items"
        icon={AssetBoxIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <HStack alignItems="flex-end">
            <Text size="xl" fontWeight={800} color="red.500">
              {data?.data?.criticalEvents}
            </Text>
            <Text color="neutral.600" mb="4px" fontWeight={700}>
              Critical Issues
            </Text>
          </HStack>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Upcoming Audit"
        icon={MaintenanceIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <Text color="neutral.600" mb="4px" fontWeight={700}>
            Next Audit: July 15, 2024
          </Text>
        </Skeleton>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Flagged RIsk"
        icon={TaskIcon}
        containerStyle={{ minH: '164px' }}
      >
        <Skeleton isLoaded={!isLoading} minW="30px" minH="30px">
          <HStack alignItems="flex-end">
            <Text size="xl" fontWeight={800} color="primary.500">
              {data?.data?.recentAlerts}
            </Text>
            <Text color="neutral.600" mb="4px" fontWeight={700}>
              High-Risk Alerts
            </Text>
          </HStack>
        </Skeleton>
      </SummaryCardWrapper>
    </SimpleGrid>
  );
};

export default SummaryCards;

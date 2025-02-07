import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import { MaintenanceIcon } from '~/lib/components/CustomIcons/Dashboard';
import TaskOverview from './TaskOverview';
import OpenTicketSummary from '../../Common/Summaries/OpenTicketSummary';
import TotalAssetSummary from '../../Common/Summaries/TotalAssetSummary';
import { useGetFrontdeskDashboardStatQuery } from '~/lib/redux/services/dashboard/frontdesk.services';
import { useSession } from 'next-auth/react';

const SectionOne = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading } = useGetFrontdeskDashboardStatQuery(
    { userId: user?.userId! },
    { skip: !user?.userId }
  );
  return (
    <SimpleGrid width="full" columns={{base:1, md:2, lg:4}} gap="16px">
      {/* Open Ticket */}
      <OpenTicketSummary
        isLoading={isLoading}
        ticketCount={data?.data?.openTickets}
        percentChange={data?.data?.openTicketsPercentageChange}
      />
      {/* Open Ticket */}
      <TotalAssetSummary
        isLoading={isLoading}
        assetInUse={data?.data?.assetsInUseCount}
        assetNotInUse={data?.data?.assetsNotInUseCount}
        percentChange={data?.data?.assetsInUsePercentageChange}
      />
      {/* Upcoming Maintenance */}
      <SummaryCardWrapper
        title="Upcoming Maintenance"
        icon={MaintenanceIcon}
        containerStyle={{ minH: '164px' }}
      >
        <VStack
          justifyContent="space-between"
          alignItems="flex-start"
          height="full"
        >
          <HStack alignItems="flex-end" spacing="4px">
            <Skeleton isLoaded={!isLoading}>
              <Text
                mt="8px"
                fontSize="24px"
                lineHeight="28.51px"
                fontWeight={800}
                color="primary.500"
              >
                {data?.data?.upcomingMaintenanceByWeek.toLocaleString() ?? '-'}
              </Text>
            </Skeleton>
            <Text color="neutral.600" fontWeight={700} mb="4px">
              This week
            </Text>
          </HStack>
          <HStack spacing="4px">
            <Skeleton isLoaded={!isLoading}>
              <Text
                color="#07CC3B"
                py="2.65px"
                px="5.3px"
                rounded="full"
                bgColor="#07CC3B0D"
                fontWeight={700}
              >
                {data?.data?.upcomingMaintenanceByDay?.toLocaleString() ?? '-'}
              </Text>
            </Skeleton>
            <Text color="neutral.600" fontWeight={700}>
              Today
            </Text>
          </HStack>
        </VStack>
      </SummaryCardWrapper>
      {/* Upcoming Maintenance */}
      <TaskOverview
        isLoading={isLoading}
        taskCount={data?.data.totalTasksCount}
        completedTaskCount={data?.data.completedTask}
        notCompletedTaskCount={data?.data.incompleteTask}
        percentageCompleted={data?.data?.completeTaskPercentageChange}
      />
    </SimpleGrid>
  );
};

export default SectionOne;

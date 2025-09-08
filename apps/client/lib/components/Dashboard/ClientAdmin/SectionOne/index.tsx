import { HStack, SimpleGrid, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetDashboardStatQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import ProgressIndicator from '../../Common/ProgressIndicator';
import OpenTicketSummary from '../../Common/Summaries/OpenTicketSummary';
import TotalAssetSummary from '../../Common/Summaries/TotalAssetSummary';
import PendingTask from './PendingTask';

const SectionOne = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { data, isLoading } = useGetDashboardStatQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
  });
  return (
    <SimpleGrid
      width="full"
      spacing="16px"
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
    >
      <TotalAssetSummary
        isLoading={isLoading}
        assetInUse={data?.data?.totalAssets}
        assetNotInUse={data?.data?.assetsNotInUse}
        percentChange={data?.data?.totalAssetsPercentageChange}
      />
      <OpenTicketSummary
        isLoading={isLoading}
        ticketCount={data?.data?.openTickets}
        percentChange={data?.data?.openTicketsPercentageChange}
      />
      <PendingTask
        isLoading={false}
        totalTask={data?.data?.pendingTasks}
        highPriority={data?.data?.highPriorityPendingTasks}
        mediumPriority={data?.data?.mediumPriorityPendingTasks}
        lowPriority={data?.data?.lowPriorityPendingTasks}
      />
      <SummaryCardWrapper
        title="Total Number of Vendors"
        containerStyle={{ minH: '164px' }}
        additionalContent={
          <Text color="neutral.600" fontWeight={700} mb="4px">
            This month
          </Text>
        }
        isLoading={isLoading}
        count={data?.data?.totalNoOfVendors}
      >
        <HStack spacing="4px">
          <ProgressIndicator
            valueChange={data?.data?.totalNoOfVendorsPercentageChange ?? 0}
          />
          <Text color="neutral.600" fontWeight={700}>
            Compared to last month
          </Text>
        </HStack>
      </SummaryCardWrapper>
    </SimpleGrid>
  );
};

export default SectionOne;

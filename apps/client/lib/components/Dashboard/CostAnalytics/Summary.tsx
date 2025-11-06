import { Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons';
import ProgressIndicator from '../Common/ProgressIndicator';
import { useGetTicketPerformanceDashboardSummaryQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';

const Summary = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetTicketPerformanceDashboardSummaryQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      ticketTypes: filters?.ticketTypes,
      datePeriod: filters?.datePeriod?.[0],
    });
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, lg: 4 }}>
      <SummaryCard
        title="Assets Monitored by AI"
        icon={AssetBoxIcon}
        value={data?.data?.totalTickets ?? 'N/A'}
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px' }}
        additionalContent={
          <Text color="neutral.600" fontWeight={700}>
            Out of 1,248 total assets
          </Text>
        }
      />
      <SummaryCard
        title="Active Anomalies Detected"
        icon={AssetBoxIcon}
        value={data?.data?.openTickets ?? 'N/A'}
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={2.1}
              iconStyles={{ color: '#D67D00' }}
              textStyles={{ color: '#D67D00' }}
              customStyles={{ bgColor: '#6E7D8E33', color: '#D67D00' }}
            />
            <Text color="neutral.600" fontWeight={700}>
              since yesterday
            </Text>
          </HStack>
        }
        customCountStyle={{ color: '#D67D00' }}
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#D67D000F"
        />
      </SummaryCard>
      <SummaryCard
        title="High-Risk Assets"
        icon={AssetBoxIcon}
        value={data?.data?.overdueTickets ?? 'N/A'}
        isLoading={isLoading || isFetching}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        customCountStyle={{ color: '#F50000' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={2.1}
              iconStyles={{ color: '#F50000' }}
              textStyles={{ color: '#F50000' }}
              customStyles={{ bgColor: '#6E7D8E33', color: '#F50000' }}
            />
            <Text color="neutral.600" fontWeight={700}>
              vs last week
            </Text>
          </HStack>
        }
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#F500000F"
        />
      </SummaryCard>
      <SummaryCard
        title="Model Accuracy Rate"
        icon={AssetBoxIcon}
        value={
          data?.data?.slaComplianceRate
            ? `${data?.data?.slaComplianceRate}%`
            : 'N/A'
        }
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
      />
    </SimpleGrid>
  );
};

export default Summary;

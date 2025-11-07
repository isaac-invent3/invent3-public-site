import { HStack, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons';
import ProgressIndicator from '../Common/ProgressIndicator';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetCostAnalyticsDashboardSummaryQuery } from '~/lib/redux/services/dashboard/costanalytics.services';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

const Summary = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetCostAnalyticsDashboardSummaryQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      costTypes: filters?.costTypes,
      costPeriod: filters?.datePeriod?.[0],
    });
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, lg: 4 }}>
      <SummaryCard
        title="Total Maintenance Cost"
        icon={AssetBoxIcon}
        value={`₦${formatNumberShort(data?.data?.totalMaintenanceCost ?? 0)}`}
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={data?.data?.maintenanceCostChangePercent ?? 0}
            />
            <Text color="neutral.600" fontWeight={700}>
              vs last month
            </Text>
          </HStack>
        }
      />
      <SummaryCard
        title="Average Cost per Asset"
        icon={AssetBoxIcon}
        value={`₦${data?.data?.averageCost?.toLocaleString() ?? 0}`}
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{
          minH: '155px',
        }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Skeleton isLoaded={!isLoading && !isFetching}>
          <Text color="neutral.600" mt="8px">
            Accross {data?.data?.totalAssets?.toLocaleString()} active assets
          </Text>
        </Skeleton>
      </SummaryCard>
      <SummaryCard
        title="Predictive Maintenance Savings"
        icon={AssetBoxIcon}
        value={`₦${formatNumberShort(data?.data?.predictiveMaintenanceSavings ?? 0)}`}
        isLoading={isLoading || isFetching}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={data?.data?.maintenanceCostChangePercent ?? 0}
            />
            <Text color="neutral.600" fontWeight={700}>
              efficiency
            </Text>
          </HStack>
        }
      />
      <SummaryCard
        title="Energy Consumption Cost"
        icon={AssetBoxIcon}
        value={`₦${formatNumberShort(data?.data?.energyCost ?? 0)}`}
        isLoading={isLoading || isFetching}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <HStack spacing={2}>
            <ProgressIndicator
              valueChange={data?.data?.consumptionCostChangePercent ?? 0}
            />
            <Text color="neutral.600" fontWeight={700}>
              efficiency
            </Text>
          </HStack>
        }
      />
    </SimpleGrid>
  );
};

export default Summary;

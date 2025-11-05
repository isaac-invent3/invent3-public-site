import { Flex, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons';
import ProgressIndicator from '../Common/ProgressIndicator';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetPerformanceDashboardSummaryQuery } from '~/lib/redux/services/dashboard/assetperformance.services';

const Summary = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetAssetPerformanceDashboardSummaryQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
    });
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, md: 4 }}>
      <SummaryCard
        title="Total Asset"
        icon={AssetBoxIcon}
        value={data?.data?.totalAssets ?? 'N/A'}
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px' }}
      />
      <SummaryCard
        title="Average Uptime (%)"
        icon={AssetBoxIcon}
        value={
          data?.data?.averageUptime ? `${data?.data?.averageUptime}%` : 'N/A'
        }
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
        additionalContent={
          <ProgressIndicator
            valueChange={2.1}
            customStyles={{ bgColor: '#6E7D8E33' }}
          />
        }
        customCountStyle={{ color: '#009F2A' }}
      >
        <Flex
          width="full"
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgColor="#009F2A0F"
        />
      </SummaryCard>
      <SummaryCard
        title="Assets in Downtime"
        icon={AssetBoxIcon}
        value={data?.data?.assetsInDowntime ?? 'N/A'}
        isLoading={isLoading || isFetching}
        showRange={true}
        containerStyle={{ minH: '155px', position: 'relative' }}
        rangeText="3 from yesterday"
        customCountStyle={{ color: '#F50000' }}
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
        title="Average Health Score"
        icon={AssetBoxIcon}
        value={
          data?.data?.averageHealthScore
            ? `${data?.data?.averageHealthScore}%`
            : 'N/A'
        }
        isLoading={isLoading || isFetching}
        showRange={false}
        containerStyle={{ minH: '155px', position: 'relative' }}
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
    </SimpleGrid>
  );
};

export default Summary;

import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCardWrapper from '~/lib/components/Common/SummaryCardWrapper';
import { AssetBoxIcon, TrendIcon } from '~/lib/components/CustomIcons';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetPredictiveSlaDashboardSummaryQuery } from '~/lib/redux/services/prediction.services';

const Summary = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveSlaDashboardSummaryQuery({
      datePeriod: filters?.datePeriod?.[0],
    });
  return (
    <SimpleGrid width="full" gap="14px" columns={{ base: 1, sm: 2, lg: 4 }}>
      <SummaryCardWrapper
        title="Total Predictive Tasks"
        icon={TrendIcon}
        count={data?.data?.totalPredictiveTickets ?? 'N/A'}
        isLoading={isLoading || isFetching}
        containerStyle={{ minH: '155px' }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Text color="neutral.600" mt="8px" maxW="70%">
          All predictive maintenance tasks tracked this period.
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="On-Time Compliance"
        icon={TrendIcon}
        count={
          data?.data?.onTimeCompliance
            ? `${data?.data?.onTimeCompliance}%`
            : 'N/A'
        }
        isLoading={isLoading || isFetching}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          border: '1px solid #00A129',
        }}
        subContainerStyle={{ height: 'max-content' }}
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
        <Text color="neutral.600" mt="8px" maxW="70%">
          Percentage of tasks completed within SLA window
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Breached SLAs"
        icon={AssetBoxIcon}
        count={data?.data?.breachedSla ?? 'N/A'}
        isLoading={isLoading || isFetching}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          border: '1px solid #F50000',
        }}
        subContainerStyle={{ height: 'max-content' }}
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
        <Text color="neutral.600" mt="8px" maxW="70%">
          Tasks that missed SLA deadlines.
        </Text>
      </SummaryCardWrapper>
      <SummaryCardWrapper
        title="Avg. Response Time"
        icon={TrendIcon}
        count={
          data?.data?.avgResponseTime
            ? `${data?.data?.avgResponseTime}Hrs`
            : 'N/A'
        }
        isLoading={isLoading || isFetching}
        containerStyle={{ minH: '155px', position: 'relative' }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Text color="neutral.600" mt="8px" maxW="70%">
          Average time to respond to predictive tasks.
        </Text>
      </SummaryCardWrapper>
    </SimpleGrid>
  );
};

export default Summary;

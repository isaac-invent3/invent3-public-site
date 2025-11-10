import { Flex, Progress, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../Common/Summaries/SummaryCardWithPercentChange';
import { AssetBoxIcon } from '../../CustomIcons/Dashboard';
import { useGetMLInsightSummaryMetricsQuery } from '~/lib/redux/services/dashboard/ai';
import Image from 'next/image';

const Summary = () => {
  const { data, isLoading } = useGetMLInsightSummaryMetricsQuery();
  return (
    <SimpleGrid width="full" columns={{ base: 1, sm: 2, lg: 4 }} gap="14px">
      <SummaryCard
        title="Total AI Predictions This Week"
        icon={AssetBoxIcon}
        value={data?.data?.totalPredictionsThisWeek ?? 'N/A'}
        isLoading={isLoading}
        showRange={false}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          overflow: 'hidden',
        }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Text color="neutral.600" mt="8px">
          Across assets and maintenance models
        </Text>
        <Flex
          position="absolute"
          width="110px"
          height="110px"
          right={0}
          bottom="-20px"
        >
          <Image src="/ai-summary-bg-1.png" fill alt="bg-image" />
        </Flex>
      </SummaryCard>
      <SummaryCard
        title="Accuracy Rate (7d Rolling)"
        icon={AssetBoxIcon}
        value={
          data?.data?.accuracyRate7dRolling
            ? `${data?.data?.accuracyRate7dRolling}%`
            : 'N/A'
        }
        isLoading={isLoading}
        showRange={false}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          overflow: 'hidden',
        }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Progress
          value={data?.data?.accuracyRate7dRolling}
          size="sm"
          height="8px"
          width="full"
          rounded="full"
          mt="16px"
          //   flex="1"
          sx={{
            '& > div': {
              backgroundColor: '#17A1FA',
            },
            backgroundColor: '#B9B9B9',
          }}
        />
        <Flex
          position="absolute"
          width="110px"
          height="110px"
          right={0}
          bottom="-5px"
        >
          <Image src="/ai-summary-bg-2.png" fill alt="bg-image" />
        </Flex>
      </SummaryCard>
      <SummaryCard
        title="Active AI Alerts"
        icon={AssetBoxIcon}
        value={data?.data?.activeAIAlerts ?? 'N/A'}
        isLoading={isLoading}
        showRange={false}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          overflow: 'hidden',
        }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Text color="neutral.600" mt="8px">
          Requiring immediate attention
        </Text>
        <Flex
          position="absolute"
          width="110px"
          height="110px"
          right={0}
          bottom="-5px"
        >
          <Image src="/ai-summary-bg-2.png" fill alt="bg-image" />
        </Flex>
      </SummaryCard>
      <SummaryCard
        title="Optimization Opportunities Found"
        icon={AssetBoxIcon}
        value={data?.data?.optimizationOpportunities ?? 'N/A'}
        isLoading={isLoading}
        showRange={false}
        containerStyle={{
          minH: '155px',
          position: 'relative',
          overflow: 'hidden',
        }}
        subContainerStyle={{ height: 'max-content' }}
      >
        <Text color="neutral.600" mt="8px">
          Energy & Cost savings detected
        </Text>
        <Flex
          position="absolute"
          width="110px"
          height="110px"
          right={0}
          bottom="-5px"
        >
          <Image src="/ai-summary-bg-2.png" fill alt="bg-image" />
        </Flex>
      </SummaryCard>
    </SimpleGrid>
  );
};

export default Summary;

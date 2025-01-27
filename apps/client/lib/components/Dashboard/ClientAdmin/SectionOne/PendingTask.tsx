import { Flex, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TaskIcon } from '~/lib/components/CustomIcons/Dashboard';
import SummaryCardWrapper from '../../Common/SummaryCardWrapper';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';

const chartLegendItems = [
  {
    label: 'High Priority',
    color: '#F50000',
  },
  {
    label: 'Medium Priority',
    color: '#EABC30',
  },
  {
    label: 'Low Priority',
    color: '#07CC3B',
  },
];

interface PendingTaskProps {
  isLoading: boolean;
}
const PendingTask = (props: PendingTaskProps) => {
  const { isLoading } = props;
  const ticketValue = 900;
  return (
    <SummaryCardWrapper
      title="Pending Tasks"
      icon={TaskIcon}
      containerStyle={{ minH: '164px' }}
    >
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
        spacing={0}
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
              {ticketValue !== undefined ? ticketValue.toLocaleString() : '-'}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700} mb="4px">
            Total Task
          </Text>
        </HStack>
        <HStack spacing="4px" justifyContent="space-between" width="full">
          <ChartLegend
            chartLegendItems={chartLegendItems}
            containerStyle={{
              direction: 'column',
              spacing: '6px',
              mt: '13px',
            }}
            textStyle={{
              whiteSpace: 'nowrap',
            }}
          />
          <Flex>
            <DoughtnutChart
              labels={chartLegendItems.map((item) => item.label)}
              datasets={[
                {
                  data: [70, 30, 40],
                  backgroundColor: chartLegendItems.map((item) => item.color),
                  borderWidth: 0,
                },
              ]}
              type="full"
              height="80px"
              cutout="60%"
            />
          </Flex>
        </HStack>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default PendingTask;

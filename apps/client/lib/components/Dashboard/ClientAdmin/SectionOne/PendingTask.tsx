import { Flex, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TaskIcon } from '~/lib/components/CustomIcons/Dashboard';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';

interface PendingTaskProps {
  isLoading: boolean;
  highPriority?: number;
  mediumPriority?: number;
  lowPriority?: number;
  totalTask?: number;
}
const PendingTask = (props: PendingTaskProps) => {
  const { isLoading, highPriority, mediumPriority, lowPriority, totalTask } =
    props;

  const chartLegendItems = [
    {
      label: 'High Priority',
      color: '#F50000',
      value: highPriority,
    },
    {
      label: 'Medium Priority',
      color: '#EABC30',
      value: mediumPriority,
    },
    {
      label: 'Low Priority',
      color: '#07CC3B',
      value: lowPriority,
    },
  ];

  return (
    <SummaryCardWrapper
      title="Pending Tasks"
      icon={TaskIcon}
      containerStyle={{ minH: '164px' }}
      count={totalTask}
      additionalContent={
        <Text color="neutral.600" fontWeight={700} mb="4px">
          Total Task
        </Text>
      }
    >
      <HStack spacing="4px" width="full" justifyContent="space-between">
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
        <Flex width="80px">
          <DoughtnutChart
            labels={chartLegendItems.map((item) => item.label)}
            datasets={[
              {
                data: chartLegendItems.map((item) => item.value ?? 0),
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
    </SummaryCardWrapper>
  );
};

export default PendingTask;

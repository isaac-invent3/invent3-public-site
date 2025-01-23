import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import CardHeader from '../CardHeader';
import DropDown from '../DropDown';
import ChartLegend from './ChartLegend';
import StackedBarChart from './StackedBarChart';
import { CompleteAndIncompleteTask } from '~/lib/interfaces/dashboard.interfaces';
import { Option } from '@repo/interfaces';
import { transformMonthIdsToShortNames } from '../utils';

interface TaskCompletionRateChartProps {
  completedColorCode: string;
  notCompletedColorCode: string;
  isLoading: boolean;
  data: CompleteAndIncompleteTask[];
  selectedYear?: Option;
  setSelectedYear?: React.Dispatch<React.SetStateAction<Option | undefined>>;
}

const TaskCompletionRateChart = (props: TaskCompletionRateChartProps) => {
  const {
    completedColorCode,
    notCompletedColorCode,
    isLoading,
    data,
    selectedYear,
    setSelectedYear,
  } = props;

  const chartLegendItems = [
    {
      label: 'Not Completed',
      color: notCompletedColorCode,
    },
    {
      label: 'Completed',
      color: completedColorCode,
    },
  ];

  return (
    <VStack
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Task Completion Rate</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => {
            setSelectedYear && setSelectedYear(option);
          }}
          selectedOptions={selectedYear ?? null}
          width="100px"
        />
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="31px"
        justifyContent="space-between"
      >
        <ChartLegend chartLegendItems={chartLegendItems} />
        <StackedBarChart
          labels={transformMonthIdsToShortNames(
            data?.map((item) => item.monthId)
          )}
          firstStack={{
            label: 'Completed',
            values: data?.map((item) => item.complete),
            color: completedColorCode,
          }}
          secondStack={{
            label: 'Not Completed',
            values: data?.map((item) => item.inComplete),
            color: notCompletedColorCode,
          }}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default TaskCompletionRateChart;

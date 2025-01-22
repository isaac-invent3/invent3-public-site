import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard.services';
import { AREA_ENUM } from '~/lib/utils/constants';
import CardHeader from '../CardHeader';
import DropDown from '../DropDown';
import ChartLegend from './ChartLegend';
import StackedBarChart from './StackedBarChart';

interface TaskCompletionRateChartProps {
  completedColorCode: string;
  notCompletedColorCode: string;
}

const TaskCompletionRateChart = (props: TaskCompletionRateChartProps) => {
  const { completedColorCode, notCompletedColorCode } = props;
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const isProperState = selectedState?.label && selectedState?.label !== 'All';
  const { data, isLoading, isFetching } = useGetMaintenanceCostStatsQuery({
    id: isProperState ? selectedState.value : selectedCountry?.value,
    areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
    year: selectedYear?.value,
    useYearToDateLogic: true,
  });
  const { labels } = transformCostsData(data?.data?.projectedAndActualCosts);

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
            setSelectedYear(option);
          }}
          selectedOptions={selectedYear}
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
          labels={labels}
          firstStack={{
            label: 'Completed',
            values: [10, 20, 60, 50, 10, 20, 40, 35, 10, 20, 25, 15, 10],
            color: completedColorCode,
          }}
          secondStack={{
            label: 'Not Completed',
            values: [5, 30, 30, 40, 5, 30, 30, 40, 5, 30, 30],
            color: notCompletedColorCode,
          }}
          isLoading={isLoading || isFetching}
        />
      </VStack>
    </VStack>
  );
};

export default TaskCompletionRateChart;

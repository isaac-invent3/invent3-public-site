import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import CardHeader from '../../../Common/CardHeader';
import DropDown from '../../../Common/DropDown';
import ChartKey from '../../../Common/ChartKey';
import { useAppSelector } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard.services';
import { AREA_ENUM } from '~/lib/utils/constants';
import StackedBarChart from './StackedBarChart';

const chartKeyItems = [
  {
    label: 'Not Completed',
    color: '#00A129',
  },
  {
    label: 'Completed',
    color: '#033376',
  },
];

const TaskCompletionRate = () => {
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

  return (
    <VStack
      width="full"
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
        <ChartKey chartKeyItems={chartKeyItems} />
        <StackedBarChart
          labels={labels}
          completed={[10, 20, 60, 50, 10, 20, 40, 35, 10, 20, 25, 15, 10]}
          not_completed={[5, 30, 30, 40, 5, 30, 30, 40, 5, 30, 30]}
          isLoading={isLoading || isFetching}
        />
      </VStack>
    </VStack>
  );
};

export default TaskCompletionRate;

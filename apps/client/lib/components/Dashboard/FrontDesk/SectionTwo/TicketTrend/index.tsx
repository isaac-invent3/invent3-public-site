import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import LineChart from './LineGraph';
import { AREA_ENUM } from '~/lib/utils/constants';
import CardHeader from '../../../Common/CardHeader';
import DropDown from '../../../Common/DropDown';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard.services';
import { Option } from '@repo/interfaces';
import ChartKey from '../../../Common/ChartKey';

const chartKeyItems = [
  {
    label: 'Opened',
    color: '#0366EF',
  },
  {
    label: 'Resolved',
    color: '#00A129',
  },
];
const TicketTrend = () => {
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
        <CardHeader>Ticket Trends</CardHeader>
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
        spacing="34px"
        justifyContent="space-between"
      >
        <ChartKey chartKeyItems={chartKeyItems} />
        <LineChart
          labels={labels}
          opened={[10, 20, 60, 50, 10, 20, 40, 35, 10, 20, 25, 15, 10]}
          resolved={[5, 30, 30, 40, 5, 30, 30, 40, 5, 30, 30]}
          isLoading={isLoading || isFetching}
        />
      </VStack>
    </VStack>
  );
};

export default TicketTrend;

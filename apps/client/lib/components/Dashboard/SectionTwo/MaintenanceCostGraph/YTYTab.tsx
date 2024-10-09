import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Info from './Info';
import LineChart from './LineGraph';
import DropDown from '../../Common/DropDown';
import { AREA_ENUM, monthOptions } from '~/lib/utils/constants';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard.services';

const YTYTab = () => {
  const [selectedMonth, setSelectMonth] = useState<Option | null>(null);
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const isProperState = selectedState?.label && selectedState?.label !== 'All';
  const isProperMonth = selectedMonth?.label && selectedMonth?.label !== 'All';

  const { data, isLoading, isFetching } = useGetMaintenanceCostStatsQuery({
    id: isProperState ? selectedState.value : selectedCountry?.value,
    areaType: isProperState ? AREA_ENUM.state : AREA_ENUM.country,
    year: selectedYear?.value,
    month: isProperMonth ? selectedMonth?.value : null,
    useYearToDateLogic: false,
  });

  const {
    monthActual,
    monthProjected,
    monthLabels,
    weekLabels,
    weeklyActual,
    weeklyProjected,
  } = transformCostsData(data?.data?.projectedAndActualCosts);
  return (
    <VStack width="full" spacing="10px">
      <HStack width="full" justifyContent="flex-end">
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => setSelectedYear(option)}
          selectedOptions={selectedYear}
          width="100px"
        />
        <DropDown
          options={monthOptions}
          label="Month"
          handleClick={(option) => setSelectMonth(option)}
          selectedOptions={selectedMonth}
          width="100px"
        />
      </HStack>
      <Info
        value={data?.data?.totalMaintenanceCost}
        valueChange={data?.data?.percentageChange}
        isLoading={isLoading || isFetching}
      />
      <LineChart
        labels={isProperMonth ? weekLabels : monthLabels}
        actual={isProperMonth ? weeklyActual : monthActual}
        projected={isProperMonth ? weeklyProjected : monthProjected}
        isLoading={isLoading || isFetching}
      />
    </VStack>
  );
};

export default YTYTab;

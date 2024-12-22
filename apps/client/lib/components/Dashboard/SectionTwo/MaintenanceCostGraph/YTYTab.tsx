import { HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard.services';
import { AREA_ENUM, monthOptions } from '~/lib/utils/constants';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import DropDown from '../../Common/DropDown';
import Info from './Info';
import LineChart from './LineGraph';

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
    monthNo: isProperMonth ? selectedMonth?.value : undefined,
    useYearToDateLogic: false,
  });

  const { actualCost, projectedCost, labels } = transformCostsData(
    data?.data?.projectedAndActualCosts,
    isProperMonth ? true : false
  );
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
        value={data?.data?.totalMaintenanceCost ?? 0}
        valueChange={data?.data?.percentageChange ?? 0}
        isLoading={isLoading || isFetching}
      />
      <LineChart
        labels={labels}
        actual={actualCost}
        projected={projectedCost}
        isLoading={isLoading || isFetching}
      />
    </VStack>
  );
};

export default YTYTab;

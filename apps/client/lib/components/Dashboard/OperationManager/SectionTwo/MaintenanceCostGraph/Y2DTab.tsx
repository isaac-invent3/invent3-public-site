import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Info from './Info';
import { Option } from '~/lib/interfaces/general.interfaces';
import {
  generateLastFiveYears,
  transformCostsData,
} from '~/lib/utils/helperFunctions';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetMaintenanceCostStatsQuery } from '~/lib/redux/services/dashboard/operationmanager.services';
import { AREA_ENUM } from '~/lib/utils/constants';
import DropDown from '../../../Common/DropDown';
import LineChart from '../../../Common/Charts/LineChart';

const Y2DTab = () => {
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
  const { actualCost, projectedCost, labels } = transformCostsData(
    data?.data?.projectedAndActualCosts
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
      </HStack>
      <Info
        value={data?.data?.totalMaintenanceCost ?? 0}
        valueChange={data?.data?.percentageChange ?? 0}
        isLoading={isLoading || isFetching}
      />
      <LineChart
        labels={labels}
        datasets={[
          {
            label: 'Actual',
            data: actualCost,
            borderColor: '#8D35F1',
            pointBorderColor: '#fff',
            pointBackgroundColor: '#8D35F1',
            pointRadius: 6,
            borderWidth: 3,
            tension: 0.4,
            fill: false,
          },
          {
            label: 'Projected',
            data: projectedCost,
            borderColor: '#FF7A3766',
            borderDash: [8, 4],
            pointRadius: 0,
            fill: false,
            tension: 0.4,
            borderWidth: 3,
          },
        ]}
        isLoading={isLoading || isFetching}
      />
    </VStack>
  );
};

export default Y2DTab;

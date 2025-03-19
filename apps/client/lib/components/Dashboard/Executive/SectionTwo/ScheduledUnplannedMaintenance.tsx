import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import StackedBarChart from '../../Common/Charts/StackedBarChart';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetMaintenanceTrendQuery } from '~/lib/redux/services/dashboard/executive.services';
import { useAppSelector } from '~/lib/redux/hooks';

const ScheduledUnplannedMaintenance = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading } = useGetMaintenanceTrendQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
    year: (selectedYear?.value as number) ?? undefined,
  });

  const chartLegendItems = [
    {
      label: 'Scheduled',
      color: '#98FEFE',
    },
    {
      label: 'Unplanned Maintenance',
      color: '#0E2642',
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
        <CardHeader>Scheduled vs Unplanned Maintenance</CardHeader>
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
          labels={
            data?.data
              ? transformMonthIdsToShortNames(
                  data?.data?.taskCompletionRates.map((item) => item.monthId)
                )
              : []
          }
          firstStack={{
            label: 'Unplanned Maintenance',
            values:
              data?.data?.taskCompletionRates.map((item) => item.unplanned) ??
              [],
            color: '#0E2642',
          }}
          secondStack={{
            label: 'Scheduled',
            values:
              data?.data?.taskCompletionRates.map((item) => item.scheduled) ??
              [],
            color: '#98FEFE',
          }}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default ScheduledUnplannedMaintenance;

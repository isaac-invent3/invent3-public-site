import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import { useGetSuperAdminSubscriptionTrendQuery } from '~/lib/redux/services/dashboard/superadmin.services';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import StackedBarChart from '../../Common/Charts/StackedBarChart';
import { transformMonthIdsToShortNames } from '../../Common/utils';

const ScheduledUnplannedMaintenance = () => {
  const { data, isLoading } = useGetSuperAdminSubscriptionTrendQuery();
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
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
                  data?.data.map((item) => item.monthId)
                )
              : []
          }
          firstStack={{
            label: 'Unplanned Maintenance',
            values: data?.data?.map((item) => item.paid) ?? [],
            color: '#0E2642',
          }}
          secondStack={{
            label: 'Scheduled',
            values: data?.data?.map((item) => item.free) ?? [],
            color: '#98FEFE',
          }}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default ScheduledUnplannedMaintenance;

import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import BarChart from '../../Common/Charts/BarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetSuperAdminSubscriptionTrendQuery } from '~/lib/redux/services/dashboard/superadmin.services';

const SubscriptionTrends = () => {
  const { data, isLoading } = useGetSuperAdminSubscriptionTrendQuery();
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );
  const chartLegendItems = [
    {
      label: 'Free',
      color: '#98FEFE',
    },
    {
      label: 'Paid',
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
        <CardHeader>Subscription Trends</CardHeader>
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
        <BarChart
          labels={
            data?.data
              ? transformMonthIdsToShortNames(
                  data?.data.map((item) => item.monthId)
                )
              : []
          }
          chartData={[
            {
              label: 'Paid',
              values: data?.data?.map((item) => item.paid) ?? [],
              color: '#0E2642',
            },
            {
              label: 'Free',
              values: data?.data?.map((item) => item.free) ?? [],
              color: '#98FEFE',
            },
          ]}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default SubscriptionTrends;

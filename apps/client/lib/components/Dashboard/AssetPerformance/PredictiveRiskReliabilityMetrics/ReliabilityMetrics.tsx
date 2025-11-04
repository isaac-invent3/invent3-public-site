import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import StackedBarChart from '../../Common/Charts/StackedBarChart';
import CardHeader from '../../Common/CardHeader';
import { transformMonthIdsToShortNames } from '../../Common/utils';
import { useGetSuperAdminSubscriptionTrendQuery } from '~/lib/redux/services/dashboard/superadmin.services';

const ReliabilityMetrics = () => {
  const { data, isLoading } = useGetSuperAdminSubscriptionTrendQuery();
  const chartLegendItems = [
    {
      label: 'Mean Time Between Failures (hrs)',
      color: '#0E2642',
    },
    {
      label: 'Mean Time To Repair (MTTR) (hrs)',
      color: '#17A1FA',
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
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Reliability Metrics (MTBF / MTTR)</CardHeader>

        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{ direction: 'column', spacing: '16px' }}
        />
      </HStack>
      <StackedBarChart
        labels={
          data?.data
            ? transformMonthIdsToShortNames(
                data?.data.map((item) => item.monthId)
              )
            : []
        }
        firstStack={{
          label: 'Mean Time Between Failures (hrs)',
          values: data?.data?.map((item) => item.paid) ?? [],
          color: '#0E2642',
        }}
        secondStack={{
          label: 'Mean Time To Repair (MTTR) (hrs)',
          values: data?.data?.map((item) => item.free) ?? [],
          color: '#17A1FA',
        }}
        isLoading={isLoading}
        isStacked={false}
      />
    </VStack>
  );
};

export default ReliabilityMetrics;

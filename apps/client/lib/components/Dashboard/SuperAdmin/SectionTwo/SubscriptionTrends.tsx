import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import StackedBarChart from '../../Common/Charts/StackedBarChart';
import CardHeader from '../../Common/CardHeader';

const SubscriptionTrends = () => {
  const isLoading = false;
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
        <StackedBarChart
          labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          firstStack={{
            label: 'Paid',
            values: [10, 20, 30, 40, 50, 60],
            color: '#0E2642',
          }}
          secondStack={{
            label: 'Free',
            values: [5, 10, 35, 35, 50, 40],
            color: '#98FEFE',
          }}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default SubscriptionTrends;

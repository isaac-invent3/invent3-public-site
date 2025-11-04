import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import { formatNumberShort } from '~/lib/utils/helperFunctions';

const AssetHealthDistribution = () => {
  const isLoading = false;

  const chartLegendItems = [
    {
      label: 'Excellent (80 - 100%)',
      color: '#0E2642',
      value: 64,
    },
    {
      label: 'Fair  (50 - 79%)',
      color: '#EABC30',
      value: 27,
    },
    {
      label: 'Poor  (<50%)',
      color: '#0366EF',
      value: 9,
    },
  ];
  const totalAsset = 64 + 27 + 9;

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      maxH="375px"
    >
      <CardHeader>Asset Health Distribution by Category</CardHeader>
      <HStack
        width="full"
        justifyContent="space-between"
        flexWrap="wrap"
        alignItems="flex-start"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <Flex width="full">
          {isLoading && (
            <Skeleton width="206px" height="206px" rounded="full" />
          )}
          {!isLoading && (
            <DoughtnutChart
              labels={chartLegendItems.map((item) => item.label)}
              datasets={[
                {
                  data: chartLegendItems.map((item) => item.value ?? 0),
                  backgroundColor: chartLegendItems.map((item) => item.color),
                  borderWidth: 0,
                },
              ]}
              type="full"
              height="206px"
              cutout="50%"
              centerLabel={{
                title: 'Total Assets',
                value: formatNumberShort(totalAsset),
              }}
              showSliceLabels={true}
              tooltipFormatter={(value, total, label) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Risk Percentage: ${percent}%`,
                  `Risk Score: ${value.toLocaleString()}`,
                ];
              }}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default AssetHealthDistribution;

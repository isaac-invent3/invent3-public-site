import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';

const GraphPreview = () => {
  const dataItems = [
    {
      asset: 'HVAC-203',
      color: '#07CC3B',
      values: [
        { label: 'Oct 1', value: 10 },
        { label: 'Oct 5', value: 20 },
        { label: 'Oct 10', value: 30 },
        { label: 'Oct 15', value: 40 },
        { label: 'Oct 20', value: 50 },
        { label: 'Oct 25', value: 60 },
      ],
    },
    {
      asset: 'HVAC-102',
      color: '#EABC30',
      values: [
        { label: 'Oct 1', value: 10 },
        { label: 'Oct 5', value: 17 },
        { label: 'Oct 10', value: 27 },
        { label: 'Oct 15', value: 37 },
        { label: 'Oct 20', value: 47 },
        { label: 'Oct 25', value: 57 },
      ],
    },
    {
      asset: 'HVAC-307',
      color: '#07CC3B',
      values: [
        { label: 'Oct 1', value: 15 },
        { label: 'Oct 5', value: 25 },
        { label: 'Oct 10', value: 35 },
        { label: 'Oct 15', value: 45 },
        { label: 'Oct 20', value: 55 },
        { label: 'Oct 25', value: 65 },
      ],
    },
  ];

  const months = ['Oct 1', 'Oct 5', 'Oct 10', 'Oct 15', 'Oct 20', 'Oct 25'];

  const datasets = dataItems.map((data) => ({
    label: data.asset,
    data: months.map(
      (month) => data.values.find((v) => v.label === month)?.value ?? 0
    ),
    borderColor: data.color,
    pointBorderColor: '#fff',
    pointBackgroundColor: data.color,
    pointRadius: 0,
    borderWidth: 2,
    tension: 0.4,
    fill: false,
  }));

  return (
    <VStack width="full" px={6} spacing="22px">
      <HStack alignItems="flex-start" flexWrap="wrap" width="full" spacing={6}>
        {dataItems?.map((item, index) => (
          <HStack key={index} spacing="8px" justifyContent="flex-start">
            <Box width="8px" height="8px" bgColor={item.color} />
            <Text fontWeight={700} color="neutral.600">
              {item.asset}
            </Text>
          </HStack>
        ))}
      </HStack>
      <VStack
        width="full"
        height="full"
        minH="333px"
        p="16px"
        alignItems="flex-start"
        spacing="18px"
        bgColor="white"
        rounded="8px"
        border="1px solid #F2F1F1"
      >
        <CardHeader customStyle={{ color: 'neutral.800', fontWeight: 500 }}>
          Predictive Risk
        </CardHeader>

        <LineChart
          labels={months}
          datasets={datasets}
          isLoading={false}
          showYGrid={false}
          yLabel="Predictive Risk Score (%)"
        />
      </VStack>
    </VStack>
  );
};

export default GraphPreview;

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';

const RUL = () => {
  const dataItems = [
    {
      year: '2022',
      color: '#00A129',
      values: [
        { label: 'Lagos HQ', value: 40 },
        { label: 'Abuja HQ', value: 25 },
        { label: 'Port Harcourt Hub', value: 35 },
        { label: 'Kano Office', value: 15 },
        { label: 'Accra Office', value: 20 },
      ],
    },
    {
      year: '2023',
      color: '#EABC30',
      values: [
        { label: 'Lagos HQ', value: 45 },
        { label: 'Abuja HQ', value: 30 },
        { label: 'Port Harcourt Hub', value: 50 },
        { label: 'Kano Office', value: 20 },
        { label: 'Accra Office', value: 25 },
      ],
    },
    {
      year: '2024',
      color: '#0366EF',
      values: [
        { label: 'Lagos HQ', value: 55 },
        { label: 'Abuja HQ', value: 40 },
        { label: 'Port Harcourt Hub', value: 45 },
        { label: 'Kano Office', value: 30 },
        { label: 'Accra Office', value: 35 },
      ],
    },
  ];

  const offices = [
    'Lagos HQ',
    'Abuja HQ',
    'Port Harcourt Hub',
    'Kano Office',
    'Accra Office',
  ];

  const datasets = dataItems.map((yearItem) => ({
    label: yearItem.year,
    data: offices.map(
      (officeLabel) =>
        yearItem.values.find((v) => v.label === officeLabel)?.value ?? 0
    ),
    borderColor: yearItem.color,
    pointBorderColor: '#fff',
    pointBackgroundColor: yearItem.color,
    pointRadius: 6,
    borderWidth: 2,
    tension: 0.4,
    fill: false,
  }));

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
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <CardHeader>Remaining Useful Life (RUL)</CardHeader>

        <VStack>
          {dataItems?.map((item, index) => (
            <HStack key={index} spacing="8px">
              <Text fontWeight={700} color="neutral.600">
                {item.year}
              </Text>
              <Box width="37px" height="2px" bgColor={item.color} />
            </HStack>
          ))}
        </VStack>
      </HStack>

      <LineChart
        labels={offices}
        datasets={datasets}
        isLoading={false}
        showYGrid={false}
      />
    </VStack>
  );
};

export default RUL;

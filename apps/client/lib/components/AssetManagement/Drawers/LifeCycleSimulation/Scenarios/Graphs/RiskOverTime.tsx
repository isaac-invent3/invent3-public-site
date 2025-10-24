import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { useAppSelector } from '~/lib/redux/hooks';

const RiskOverTime = () => {
  const data = useAppSelector((state) => state.asset.simulationData);

  const dataItems = [
    {
      scenario: 'Normal Plan',
      color: '#8D35F1',
      values:
        data?.lifeCycleCostCurve?.NormalPlan?.map((item) => ({
          label: item.year,
          value: item.totalCost,
        })) ?? [],
    },
    {
      scenario: 'Smart Plan',
      color: '#07CC3B',
      values: [
        { label: '2025', value: 10 },
        { label: '2027', value: 20 },
        { label: '2029', value: 30 },
        { label: '2031', value: 40 },
        { label: '2033', value: 50 },
        { label: '2035', value: 60 },
      ],
    },
    {
      scenario: 'Late Plan',
      color: '#EABC30',
      values: [
        { label: '2025', value: 10 },
        { label: '2027', value: 17 },
        { label: '2029', value: 27 },
        { label: '2031', value: 37 },
        { label: '2033', value: 47 },
        { label: '2035', value: 57 },
      ],
    },
  ];

  const year =
    data?.lifeCycleCostCurve?.NormalPlan?.map((item) => item.year.toString()) ??
    [];

  const datasets = dataItems.map((data) => ({
    label: data.scenario,
    data: year.map(
      (officeLabel) =>
        data.values.find((v) => v.label === officeLabel)?.value ?? 0
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
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="18px"
      bgColor="white"
      rounded="8px"
      border="1px solid #F2F1F1"
    >
      <HStack width="full" justifyContent="space-between" alignItems="center">
        <CardHeader customStyle={{ color: 'neutral.800', fontWeight: 500 }}>
          Risk Over Time
        </CardHeader>

        <VStack alignItems="flex-start">
          {dataItems?.map((item, index) => (
            <HStack key={index} spacing="8px" justifyContent="flex-start">
              <Box width="37px" height="2px" bgColor={item.color} />
              <Text fontWeight={700} color="neutral.600">
                {item.scenario}
              </Text>
            </HStack>
          ))}
        </VStack>
      </HStack>

      <LineChart
        labels={year}
        datasets={datasets}
        isLoading={false}
        showYGrid={false}
        yLabel="Risk Index"
      />
    </VStack>
  );
};

export default RiskOverTime;

import { Flex, HStack, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useGetMLAnomalyDistributionQuery } from '~/lib/redux/services/dashboard/ai';
import CardHeader from '../../../Common/CardHeader';
import ChartLegend from '../../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../../Common/Charts/DoughtnutChart';

const AnomalyDistribution = () => {
  const { data, isLoading } = useGetMLAnomalyDistributionQuery();

  const total = data?.data
    ? data?.data?.mechanical +
      data?.data?.electrical +
      data?.data?.hvac +
      data?.data?.other
    : 0;
  const chartLegendItems = [
    {
      label: 'Mechanical',
      color: '#17A1FA',
      value: data?.data?.mechanical ?? 0,
      children: (
        <Text color="neutral.600" fontWeight={700}>
          {((data?.data?.mechanical ?? 0) / total) * 100}%
        </Text>
      ),
    },
    {
      label: 'Electrical',
      color: '#EABC30',
      value: data?.data?.electrical ?? 0,
      children: (
        <Text color="neutral.600" fontWeight={700}>
          {((data?.data?.electrical ?? 0) / total) * 100}%
        </Text>
      ),
    },
    {
      label: 'HVAC',
      color: '#0E2642',
      value: data?.data?.hvac ?? 0,
      children: (
        <Text color="neutral.600" fontWeight={700}>
          {((data?.data?.hvac ?? 0) / total) * 100}%
        </Text>
      ),
    },
    {
      label: 'Other',
      color: '#78787833',
      value: data?.data?.other ?? 0,
      children: (
        <Text color="neutral.600" fontWeight={700}>
          {((data?.data?.other ?? 0) / total) * 100}%
        </Text>
      ),
    },
  ];

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      alignItems="flex-start"
      spacing="18px"
    >
      <CardHeader>Anomaly Distribution</CardHeader>
      <Stack
        width="full"
        justifyContent={{ base: 'center', lg: 'space-between' }}
        flexWrap="wrap"
        alignItems={{ base: 'center', lg: 'flex-start' }}
        direction={{ base: 'column', lg: 'row' }}
        gap="32px"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
            width: { base: 'full', lg: 'max-content' },
          }}
          textStyle={{
            whiteSpace: 'nowrap',
            width: '155px',
          }}
          textChildrenStyle={{ direction: 'row' }}
          isLoading={isLoading}
        />
        <Flex width="276px">
          {isLoading && (
            <Skeleton width="276px" height="276px" rounded="full" />
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
              height="276px"
              cutout="50%"
              showSliceLabels={true}
              tooltipFormatter={(value, total, label) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Percentage: ${percent}%`,
                  `Count: ${value.toLocaleString()}`,
                ];
              }}
              showCountLabel={false}
            />
          )}
        </Flex>
      </Stack>
    </VStack>
  );
};

export default AnomalyDistribution;

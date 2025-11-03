import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { AssetComparison } from '~/lib/interfaces/asset/general.interface';
import { dateFormatter } from '~/lib/utils/Formatters';
import { generateColor } from '~/lib/utils/helperFunctions';

const GraphPreview = ({ data }: { data?: AssetComparison[] }) => {
  const dataItems = data
    ? data?.map((item, index) => ({
        asset: item.assetName,
        color: generateColor(index),
        values: item.assetRisks.map((item) => ({
          label: dateFormatter(item.day, 'MMM D'),
          value: item.predictiveScore,
        })),
      }))
    : [];

  const months =
    data?.[0]?.assetRisks
      ?.map((item) => dateFormatter(item.day, 'MMM D'))
      .filter((val): val is string => val != null) ?? [];

  const datasets = dataItems.map((data) => ({
    label: data.asset,
    data: months
      ? months.map(
          (month) => data.values.find((v) => v.label === month)?.value ?? 0
        )
      : [],
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
          labels={months ?? []}
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

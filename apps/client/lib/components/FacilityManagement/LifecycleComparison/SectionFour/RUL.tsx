import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';
import { useGetLifeCycleComparisonReportRULQuery } from '~/lib/redux/services/location/lifecycleComparison.services';

const RUL = ({ filters }: { filters: LifeCycleFilter }) => {
  const { data, isLoading, isFetching } =
    useGetLifeCycleComparisonReportRULQuery({
      ...filters,
    });
  const currentYear = new Date().getFullYear();
  const dataItems = [
    {
      year: currentYear.toString(),
      color: '#00A129',
      values:
        data?.data?.map((item) => ({ label: item.key!, value: item.value })) ??
        [],
    },
  ];

  const offices = data?.data?.map((item) => item.key) ?? [];

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
        isLoading={isLoading || isFetching}
        showYGrid={false}
      />
    </VStack>
  );
};

export default RUL;

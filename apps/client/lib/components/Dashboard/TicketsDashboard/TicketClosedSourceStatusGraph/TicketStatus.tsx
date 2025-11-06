import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import ChartLegend from '../../Common/Charts/ChartLegend';
import DoughtnutChart from '../../Common/Charts/DoughtnutChart';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTicketByStatusQuery } from '~/lib/redux/services/dashboard/ticketDashboard.services';
import { generateColor } from '~/lib/utils/helperFunctions';

const TicketStatus = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } = useGetTicketByStatusQuery({
    facilityIds: filters?.facilities,
    assetCategoryIds: filters?.assetCategories,
    ticketTypes: filters?.ticketTypes,
    datePeriod: filters?.datePeriod?.[0],
  });

  const chartLegendItems = data?.data
    ? data?.data?.map((item, index) => ({
        label: item.statusName,
        value: item.value,
        color: generateColor(index),
      }))
    : [];

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
      <CardHeader>Ticket by Status</CardHeader>
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
          {(isLoading || isFetching) && (
            <Skeleton width="206px" height="206px" rounded="full" />
          )}
          {!isLoading && !isFetching && (
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
              cutout="45%"
              showSliceLabels={true}
              tooltipFormatter={(value, total) => {
                const percent = ((value / total) * 100).toFixed(0);
                return [
                  `Percentage: ${percent}%`,
                  `Count: ${value.toLocaleString()}`,
                ];
              }}
            />
          )}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default TicketStatus;

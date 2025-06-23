import { HStack, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import PieChart from '../../Common/Charts/PieChart';
import { useGetTicketResolutionTrendsQuery } from '~/lib/redux/services/dashboard/executive.services';
import { DATE_PERIOD } from '~/lib/utils/constants';

const TicketResolutionTrends = () => {
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetTicketResolutionTrendsQuery({
    datePeriod: +DATE_PERIOD.YEAR,
  });

  const trendColors = ['#98FEFE', '#4183DD', '#0E2642'];

  const chartDataRaw = data?.data?.map((item) => item.percentage) || [];
  const sum = chartDataRaw.reduce((acc, val) => acc + (val || 0), 0);
  const others = Math.max(0, 100 - sum);
  const chartData = chartDataRaw.length > 0 ? [...chartDataRaw, others] : [];

  const chartLegendItems =
    data?.data?.map((item, idx) => ({
      label: item.categoryName,
      color: trendColors[idx] || '#B0B0B0', // fallback color if more than 3 categories
    })) || [];

  // Append 'Others' with default color if needed
  if (chartLegendItems.length > 0) {
    chartLegendItems.push({
      label: 'Others',
      color: '#B0B0B0',
    });
  }

  return (
    <VStack
      width="full"
      minH="353px"
      p="20px"
      alignItems="flex-start"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Ticket Resolution Trends</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => {
            setSelectedYear(option);
          }}
          selectedOptions={selectedYear}
          width="100px"
        />
      </HStack>
      <VStack width="full" alignItems="flex-start" spacing="37px">
        <ChartLegend
          chartLegendItems={chartLegendItems}
          isLoading={isLoading || isFetching}
          containerStyle={{ direction: 'column', spacing: '10px' }}
        />
        {(isLoading || isFetching) && (
          <HStack width="full" justifyContent="center">
            <SkeletonCircle size="200px" />
          </HStack>
        )}
        {!isLoading &&
          !isFetching &&
          (chartData && chartData.filter(Boolean).length > 0 ? (
            <PieChart
              dataValues={chartData}
              labels={chartLegendItems.map((item) => item.label)}
              pieLabel="Ticket Resolution"
              backgroundColors={chartLegendItems.map((item) => item.color)}
            />
          ) : (
            <Text width="full" textAlign="center" color="neutral.800">
              No Data at the moment
            </Text>
          ))}
      </VStack>
    </VStack>
  );
};

export default TicketResolutionTrends;

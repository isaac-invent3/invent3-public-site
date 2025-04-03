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

  const chartLegendItems = [
    {
      label: 'IT Issues',
      color: '#98FEFE',
    },
    {
      label: 'Facility Repairs',
      color: '#4183DD',
    },
    {
      label: 'Equipment Failures',
      color: '#0E2642',
    },
  ];

  const chartData = data?.data?.map((item) => item.percentage);

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

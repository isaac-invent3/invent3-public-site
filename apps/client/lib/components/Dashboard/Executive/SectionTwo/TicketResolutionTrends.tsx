import { HStack, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { useGetMaintenanceDownTimeDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import PieChart from '../../Common/Charts/PieChart';

const TicketResolutionTrends = () => {
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const [selectedYear, setSelectedYear] = useState<Option | null>(
    generateLastFiveYears()[0] as Option
  );
  const { data, isLoading, isFetching } = useGetMaintenanceDownTimeDataQuery({
    countryId: +selectedCountry?.value!,
    regionId: (selectedState?.value as number) ?? undefined,
    year: (selectedYear?.value as number) ?? undefined,
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

  const chartData = [
    data?.data?.maintenancePercentage ?? 0,
    data?.data?.downTimePercentage ?? 0,
    data?.data?.downTimePercentage ?? 0,
  ];

  return (
    <VStack
      width="full"
      minH="full"
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
          (chartData.filter(Boolean).length > 0 ? (
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

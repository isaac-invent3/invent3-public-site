import {
  HStack,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import CardHeader from '../../Common/CardHeader';
import DropDown from '../../Common/DropDown';
import ChartLegend from '../../Common/Charts/ChartLegend';
import PieChart from '../../Common/Charts/PieChart';
import { useGetMaintenanceDownTimeDataQuery } from '~/lib/redux/services/dashboard/clientadmin.services';
import { useAppSelector } from '~/lib/redux/hooks';
import ProgressIndicator from '../../Common/ProgressIndicator';
import { Option } from '@repo/interfaces';

const MaintenanceAndDowntimeChart = () => {
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
      label: 'Maintenance',
      color: '#00A129',
      children: (
        <Text
          color="neutral.600"
          fontSize="10px"
          lineHeight="11.88px"
          fontWeight={700}
        >
          {data?.data?.maintenancePercentage ?? '0'}%
        </Text>
      ),
    },
    {
      label: 'Downtime',
      color: '#0366EF',
      children: (
        <Text
          color="neutral.600"
          fontSize="10px"
          lineHeight="11.88px"
          fontWeight={700}
        >
          {data?.data?.downTimePercentage ?? '0'}%
        </Text>
      ),
    },
  ];

  const chartData = [
    data?.data?.maintenancePercentage ?? 0,
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
        <CardHeader>Maintenance vs DownTime</CardHeader>
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
        <VStack width="full" alignItems="flex-start" spacing="4px">
          <HStack spacing="4px">
            <Text color="neutral.600" fontWeight={700} mb="4px">
              This month
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <ProgressIndicator
                valueChange={data?.data?.percentageChange ?? 0}
              />
            </Skeleton>
          </HStack>
          <ChartLegend
            chartLegendItems={chartLegendItems}
            isLoading={isLoading || isFetching}
          />
        </VStack>
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
              pieLabel="Maintenance"
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

export default MaintenanceAndDowntimeChart;

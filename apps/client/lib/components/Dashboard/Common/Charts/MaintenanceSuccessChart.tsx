import { HStack, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import CardHeader from '../CardHeader';
import DropDown from '../DropDown';
import ChartLegend from './ChartLegend';
import PieChart from './PieChart';
import { useGetFrontdeskMaintenanceSuccessChartDataQuery } from '~/lib/redux/services/dashboard/frontdesk.services';
import { Option } from '@repo/interfaces';
import { useSession } from 'next-auth/react';
import { monthOptions } from '~/lib/utils/constants';

interface MaintenanceSuccessChartProps {
  missedColorCode: string;
  completedColorCode: string;
}

const MaintenanceSuccessChart = ({
  missedColorCode,
  completedColorCode,
}: MaintenanceSuccessChartProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const actualMonthOptions = monthOptions.slice(1, monthOptions.length);
  const currentMonthOption = actualMonthOptions.find(
    (item) => item.value === currentMonth + 1
  );

  const [selectedMonth, setSelectedMonth] = useState<Option | null>(
    currentMonthOption ?? null
  );
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading } = useGetFrontdeskMaintenanceSuccessChartDataQuery({
    year: currentYear,
    monthNo: +selectedMonth?.value!,
    userId: user?.userId!,
  });

  const chartData = [data?.data?.missed ?? 0, data?.data?.completed ?? 0];
  const chartLegendItems = [
    {
      label: 'Missed',
      color: '#00A129',
      children: (
        <Text fontSize="10px" lineHeight="11.88px">
          {data?.data?.missed ?? '-'}
          <Text
            as="span"
            color="neutral.600"
            fontSize="10px"
            lineHeight="11.88px"
          >
            {' '}
            . {data?.data?.percentageMissed ?? '-'}
          </Text>
        </Text>
      ),
    },
    {
      label: 'Completed',
      color: '#033376',
      children: (
        <Text fontSize="10px" lineHeight="11.88px">
          {data?.data?.completed ?? '-'}
          <Text
            as="span"
            color="neutral.600"
            fontSize="10px"
            lineHeight="11.88px"
          >
            {' '}
            . {data?.data?.percentageCompleted ?? '-'}
          </Text>
        </Text>
      ),
    },
  ];

  return (
    <VStack
      width="full"
      minH="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Maintenance Success</CardHeader>
        <HStack>
          <Text
            color="#0366EF"
            bgColor="#0366EF1A"
            fontWeight={800}
            py="6px"
            px="9.5px"
            rounded="8px"
          >
            {currentYear}
          </Text>
          <DropDown
            options={monthOptions.slice(1, monthOptions.length)}
            label="Month"
            handleClick={(option) => {
              setSelectedMonth(option);
            }}
            selectedOptions={selectedMonth}
            width="100px"
          />
        </HStack>
      </HStack>
      <VStack width="full" alignItems="flex-start" spacing="37px">
        <ChartLegend
          chartLegendItems={chartLegendItems}
          isLoading={isLoading}
        />
        {isLoading && (
          <HStack width="full" justifyContent="center">
            <SkeletonCircle size="200px" />
          </HStack>
        )}
        {!isLoading &&
          (chartData.filter(Boolean).length > 0 ? (
            <PieChart
              dataValues={chartData}
              labels={['Missed', 'Completed']}
              pieLabel="Maintenance"
              backgroundColors={[missedColorCode, completedColorCode]}
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

export default MaintenanceSuccessChart;

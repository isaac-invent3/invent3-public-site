import { Flex, HStack, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Option } from '@repo/interfaces';
import { monthOptions } from '~/lib/utils/constants';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';
import { useGetLifeCycleStageChartQuery } from '~/lib/redux/services/asset/lifeCycle.services';

const StageDistribution = () => {
  const currentMonth = new Date().getMonth();
  const actualMonthOptions = monthOptions.slice(1, monthOptions.length);
  const currentMonthOption = actualMonthOptions.find(
    (item) => item.value === currentMonth + 1
  );

  const [selectedMonth, setSelectedMonth] = useState<Option | null>(
    currentMonthOption ?? null
  );
  const currentYear = new Date().getFullYear();
  const { data, isLoading } = useGetLifeCycleStageChartQuery({
    month: +selectedMonth?.value!,
    year: currentYear,
  });

  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between" flexWrap="wrap">
        <CardHeader>Stage Distribution</CardHeader>
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
      <HStack width="full" alignItems="center" height="full">
        {isLoading && (
          <HStack width="full" justifyContent="center">
            <SkeletonCircle size="200px" />
          </HStack>
        )}
        {!isLoading &&
          data &&
          (data &&
          data?.data?.map((item) => item?.percentage).filter(Boolean).length >
            0 ? (
            <Flex width="218px">
              <PieChart
                dataValues={data?.data?.map((item) => item.percentage) || []}
                labels={
                  data?.data?.map((item) => item.lifeCycleStageName) || []
                }
                pieLabel="Distribution"
                backgroundColors={
                  data?.data?.map((item) => item.lifeCycleColorCode) || []
                }
              />
            </Flex>
          ) : (
            <Text width="full" textAlign="center" color="neutral.800">
              No Data at the moment
            </Text>
          ))}
        <ChartLegend
          chartLegendItems={
            data?.data?.map((item) => ({
              label: item?.lifeCycleStageName,
              color: item?.lifeCycleColorCode,
            })) || []
          }
          isLoading={isLoading}
          containerStyle={{
            direction: 'column',
            spacing: '8px',
          }}
        />
      </HStack>
    </VStack>
  );
};

export default StageDistribution;

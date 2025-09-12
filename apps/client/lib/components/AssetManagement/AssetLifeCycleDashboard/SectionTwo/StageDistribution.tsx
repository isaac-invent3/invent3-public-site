import { Flex, HStack, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Option } from '@repo/interfaces';
import { monthOptions } from '~/lib/utils/constants';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import DropDown from '~/lib/components/Dashboard/Common/DropDown';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';

interface StageDistributionProps {
  isLoading: boolean;
  selectedMonth: Option | null;
  setSelectedMonth: React.Dispatch<React.SetStateAction<Option | null>>;
}

const StageDistribution = ({
  isLoading,
  selectedMonth,
  setSelectedMonth,
}: StageDistributionProps) => {
  const currentYear = new Date().getFullYear();

  const chartData = [10, 30, 20, 40];
  const chartLegendItems = [
    {
      label: 'Procurement',
      color: '#0366EF',
    },
    {
      label: 'Maintenance',
      color: '#0E2642',
    },
    {
      label: 'Disposal',
      color: '#F39C12',
    },
    {
      label: 'In Use',
      color: '#07CC3B',
    },
  ];

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
          (chartData.filter(Boolean).length > 0 ? (
            <Flex width="218px">
              <PieChart
                dataValues={chartData}
                labels={chartLegendItems.map((item) => item.label)}
                pieLabel="Distribution"
                backgroundColors={chartLegendItems?.map((item) => item.color)}
              />
            </Flex>
          ) : (
            <Text width="full" textAlign="center" color="neutral.800">
              No Data at the moment
            </Text>
          ))}
        <ChartLegend
          chartLegendItems={chartLegendItems}
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

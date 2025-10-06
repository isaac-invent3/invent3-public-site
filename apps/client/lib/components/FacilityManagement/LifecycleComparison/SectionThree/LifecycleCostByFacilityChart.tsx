import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Option } from '~/lib/interfaces/general.interfaces';
import { useGetAssetRiskScoresForCategoryQuery } from '~/lib/redux/services/asset/general.services';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';

const LifecycleCostByFacilityChart = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const { data, isLoading: isLoadingRiskscore } =
    useGetAssetRiskScoresForCategoryQuery(
      { categoryId: (selectedOption?.value as number)! },
      { skip: !selectedOption?.value }
    );

  const chartLegendItems = [
    {
      label: 'Lagos HQ',
      color: '#98FEFE',
      value: 1800,
    },
    {
      label: 'Kano Office',
      color: '#4183DD',
      value: 1500,
    },
    {
      label: 'Accra Office',
      color: '#00A129',
      value: 1000,
    },
    {
      label: 'Abuja Branch',
      color: '#EABC30',
      value: 1700,
    },
    {
      label: 'Port Harcourt Hub',
      color: '#0F2540',
      value: 1700,
    },
  ];

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
      <CardHeader>Lifecycle Cost by Facility</CardHeader>
      <HStack
        width="full"
        flexWrap="wrap"
        alignItems="flex-start"
        spacing="46px"
      >
        <ChartLegend
          chartLegendItems={chartLegendItems.slice(0, 3)}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <ChartLegend
          chartLegendItems={chartLegendItems.slice(3, 5)}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
      </HStack>
      <Flex width="full" justifyContent="center">
        {isLoadingRiskscore && (
          <Skeleton width="206px" height="206px" rounded="full" />
        )}
        {!isLoadingRiskscore && (
          <PieChart
            labels={chartLegendItems.map((item) => item.label)}
            dataValues={chartLegendItems.map((item) => item.value ?? 0)}
            backgroundColors={chartLegendItems.map((item) => item.color)}
            height="180px"
            pieLabel="Lifecycle Cost"
          />
        )}
      </Flex>
    </VStack>
  );
};

export default LifecycleCostByFacilityChart;

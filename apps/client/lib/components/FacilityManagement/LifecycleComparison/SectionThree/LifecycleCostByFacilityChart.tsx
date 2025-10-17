import { Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';
import { CostByFacility } from '~/lib/interfaces/location/lifecycle.interfaces';

// ✅ Always returns a string
const generateColor = (index: number): string => {
  const palette = [
    '#98FEFE',
    '#4183DD',
    '#00A129',
    '#EABC30',
    '#0F2540',
    '#E76F51',
    '#8ECAE6',
    '#FB8500',
    '#219EBC',
    '#023047',
  ];
  return palette[index % palette.length] ?? '#CCCCCC';
};

const LifecycleCostByFacilityChart = ({
  lifeCycleCosts,
  isLoading,
}: {
  lifeCycleCosts: CostByFacility[];
  isLoading: boolean;
}) => {
  const chartLegendItems = useMemo(() => {
    if (!lifeCycleCosts?.length) return [];

    return lifeCycleCosts.map((facility, index) => ({
      label: facility.facilityName,
      color: generateColor(index), // ✅ always a string now
      value: facility.totalLifeCycleCost,
    }));
  }, [lifeCycleCosts]);

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
          chartLegendItems={chartLegendItems.slice(
            0,
            Math.ceil(chartLegendItems.length / 2)
          )}
          containerStyle={{
            direction: 'column',
            spacing: '6px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <ChartLegend
          chartLegendItems={chartLegendItems.slice(
            Math.ceil(chartLegendItems.length / 2)
          )}
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
        {isLoading ? (
          <Skeleton width="206px" height="206px" rounded="full" />
        ) : (
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

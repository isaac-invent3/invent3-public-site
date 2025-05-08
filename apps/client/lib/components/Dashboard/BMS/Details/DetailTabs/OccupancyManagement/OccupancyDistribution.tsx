import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import PieChart from '~/lib/components/Dashboard/Common/Charts/PieChart';

interface OccupancyDistributionProps {
  occupancyData: { label: string; color: string; value: number }[];
}
const OccupancyDistribution = ({
  occupancyData,
}: OccupancyDistributionProps) => {
  return (
    <VStack width="full" alignItems="flex-start" spacing="20px">
      <Text color="neutral.800" fontWeight={800} size="md">
         Occupancy Distribution
      </Text>
      <HStack width="full" spacing="80px">
        <Flex width={{ base: '80px', lg: '170px' }}>
          <PieChart
            dataValues={occupancyData.map((item) => item.value)}
            labels={occupancyData.map((item) => item.label)}
            pieLabel="Maintenance"
            backgroundColors={occupancyData.map((item) => item.color)}
          />
        </Flex>
        <ChartLegend
          chartLegendItems={occupancyData}
          containerStyle={{
            spacing: '16px',
            direction: 'column',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
          boxStyle={{ rounded: 'none' }}
        />
      </HStack>
    </VStack>
  );
};

export default OccupancyDistribution;

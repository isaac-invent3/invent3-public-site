import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { transformMonthIdsToShortNames } from '~/lib/components/Dashboard/Common/utils';
import { OpenedAndResolvedTicket } from '~/lib/interfaces/dashboard.interfaces';

const chartLegendItems = [
  {
    label: 'Opened',
    color: '#0261B8',
  },
  {
    label: 'Resolved',
    color: '#FF7A37',
  },
];

interface TrendOverTimeProps {
  data: OpenedAndResolvedTicket[];
  isLoading: boolean;
}
const TrendOverTime = (props: TrendOverTimeProps) => {
  const { data, isLoading } = props;
  return (
    <VStack
      width="full"
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>Trends Over Time</CardHeader>
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        {/* <ChartLegend chartLegendItems={chartLegendItems} /> */}
        <LineChart
          labels={transformMonthIdsToShortNames(
            data?.map((item) => item.monthId)
          )}
          datasets={[
            {
              label: 'Opened',
              data: data?.map((item) => item.openTickets),
              borderColor: '#0366EF',
              pointBorderColor: '#fff',
              pointBackgroundColor: '#0366EF',
              pointRadius: 6,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Resolved',
              data: data?.map((item) => item.resolvedTickets),
              borderColor: '#00A129',
              borderDash: [8, 4],
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
          ]}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default TrendOverTime;

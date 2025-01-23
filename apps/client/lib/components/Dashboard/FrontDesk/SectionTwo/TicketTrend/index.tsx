import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../../Common/CardHeader';
import ChartLegend from '../../../Common/Charts/ChartLegend';
import LineChart from '../../../Common/Charts/LineChart';
import { OpenedAndResolvedTicket } from '~/lib/interfaces/dashboard.interfaces';
import { transformMonthIdsToShortNames } from '../../../Common/utils';

const chartLegendItems = [
  {
    label: 'Opened',
    color: '#0366EF',
  },
  {
    label: 'Resolved',
    color: '#00A129',
  },
];

interface TicketTrendProps {
  data: OpenedAndResolvedTicket[];
  isLoading: boolean;
}
const TicketTrend = (props: TicketTrendProps) => {
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
        <CardHeader>Ticket Trends</CardHeader>
      </HStack>
      <VStack
        width="full"
        height="full"
        alignItems="flex-start"
        spacing="34px"
        justifyContent="space-between"
      >
        <ChartLegend chartLegendItems={chartLegendItems} />
        <LineChart
          labels={transformMonthIdsToShortNames(
            data?.map((item) => item.monthId)
          )}
          datasets={[
            {
              label: 'Opened',
              data: data?.map((item) => item.open),
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
              data: data?.map((item) => item.resolved),
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

export default TicketTrend;

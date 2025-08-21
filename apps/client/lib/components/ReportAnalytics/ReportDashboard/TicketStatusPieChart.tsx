import { Box, Stack, Text, VStack } from '@chakra-ui/react';

import { TopTicketStatusChart } from '~/lib/interfaces/report.interfaces';
import PieChart from '../../Dashboard/Common/Charts/PieChart';
// import ChartLegend from '../../Dashboard/Common/Charts/ChartLegend';
interface TicketStatusPieChartProps {
  ticketsStatistics: TopTicketStatusChart[];
}

const TicketStatusPieChart = (props: TicketStatusPieChartProps) => {
  const { ticketsStatistics } = props;

  const trendColors = ['#98FEFE', '#4183DD', '#0E2642'];

  const chartDataRaw = ticketsStatistics?.map((item) => item.percentage) || [];
  const sum = chartDataRaw.reduce((acc, val) => acc + (val || 0), 0);
  const others = Math.max(0, 100 - sum);
  const chartData = chartDataRaw.length > 0 ? [...chartDataRaw, others] : [];

  const chartLegendItems =
    ticketsStatistics.map((item, idx) => ({
      label: item.ticketStatusName,
      color: trendColors[idx] || '#B0B0B0', // fallback color if more than 3 categories
    })) || [];

  // Append 'Others' with default color if needed
  if (chartLegendItems.length > 0) {
    chartLegendItems.push({
      label: 'Others',
      color: '#B0B0B0',
    });
  }

  // const ticketStatusData = [
  //   {
  //     label: 'Open Tickets',
  //     value: ticketsStatistics.openTickets,
  //     color: '#D9D9D9',
  //     children: (
  //       <Text color="primary.500" fontWeight={800} size="md">
  //         {ticketsStatistics.openTickets}
  //       </Text>
  //     ),
  //   },
  //   {
  //     label: 'Escalated Tickets',
  //     value: ticketsStatistics.escalatedTickets,
  //     color: '#EABC30',
  //     children: (
  //       <Text color="primary.500" fontWeight={800} size="md">
  //         {ticketsStatistics.escalatedTickets}
  //       </Text>
  //     ),
  //   },
  //   {
  //     label: 'Resolved Tickets',
  //     value: ticketsStatistics.resolvedTickets,
  //     color: '#0366EF',
  //     children: (
  //       <Text color="primary.500" fontWeight={800} size="md">
  //         {ticketsStatistics.resolvedTickets}
  //       </Text>
  //     ),
  //   },
  // ];

  return (
    <Box
      bg="white"
      p="16px"
      borderRadius="md"
      border="1px solid #F2F1F1"
      height="100%"
      w={{ base: 'full', md: '50%' }}
    >
      <VStack alignItems="flex-start" height="100%" w="full" spacing="35px">
        <Text size="md" color="#42403D">
          Ticket Status
        </Text>

        {chartData && chartData.filter(Boolean).length > 0 ? (
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
        )}

        {/* <Stack
          width="full"
          direction="row"
          wrap="wrap"
          justifyContent="flex-start"
          spacing={{ base: '16px', lg: '49px' }}
        >
          <Box width="155px" height="155px">
            <PieChart
              dataValues={ticketStatusData.map((item) => item.value)}
              labels={ticketStatusData.map((item) => item.label)}
              pieLabel="Ticket"
              backgroundColors={ticketStatusData.map((item) => item.color)}
            />
          </Box>
          <ChartLegend
            chartLegendItems={ticketStatusData}
            containerStyle={{
              spacing: '16px',
              direction: 'column',
              mt: '24px',
            }}
            textStyle={{
              whiteSpace: 'nowrap',
              minW: '142px',
              // mt: '4px',
            }}
            textChildrenStyle={{ direction: 'row', mt: '4px' }}
            boxStyle={{ width: '20px', height: '20px' }}
          />
        </Stack> */}
      </VStack>
    </Box>
  );
};

export default TicketStatusPieChart;

import { Box, Text, VStack } from '@chakra-ui/react';
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { TicketStatistics } from '~/lib/interfaces/report.interfaces';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TicketStatusPieChartProps {
  ticketsStatistics: TicketStatistics;
}

const TicketStatusPieChart = (props: TicketStatusPieChartProps) => {
  const { ticketsStatistics } = props;

  const data: ChartData<'pie'> = {
    labels: ['Resolved Tickets', 'Escalated Tickets', 'Open Tickets'],
    datasets: [
      {
        data: [
          ticketsStatistics.resolvedTickets,
          ticketsStatistics.escalatedTickets,
          ticketsStatistics.openTickets,
        ],
        backgroundColor: ['#0366EF', '#EABC30', '#D9D9D9'],
        borderWidth: 0,
        label: 'My First Dataset',
      },
    ],
  };

  // Chart.js options
  const options: ChartOptions<'pie'> = {
    // responsive: true,
    

    plugins: {
      // legend: undefined,
    },
  };

  return (
    <Box
      bg="white"
      p="16px"
      borderRadius="md"
      border="1px solid #F2F1F1"
      height="100%"
      w={{ base: 'full', md: '50%' }}
    >
      <VStack alignItems="start" height="100%" w="full">
        <Text size="md" color="#42403D">
          Ticket Status
        </Text>

        <Box width="full" height="80%">
          <Pie data={data} options={options} />
        </Box>
      </VStack>
    </Box>
  );
};

export default TicketStatusPieChart;

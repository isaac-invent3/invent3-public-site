import React, { useState } from 'react';
import moment from 'moment';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flex, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useGetBMSHighestEnergyConsumptionByFacilityQuery } from '~/lib/redux/services/dashboard/bms.services';
import InfoCard from '../../../InfoCard';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface HighestEnergyConsumptionProps {
  title?: string;
}
const HighestEnergyConsumption = ({ title }: HighestEnergyConsumptionProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const { data: energyConsumption, isLoading } =
    useGetBMSHighestEnergyConsumptionByFacilityQuery({});
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get today in 3-letter format (e.g., 'Mon', 'Tue')
  const today = moment().format('ddd');

  // Set backgroundColor based on today's day
  const backgroundColor = labels.map((label) =>
    label === today ? '#0E2642' : '#B2CCEA'
  );

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [5, 4, 3, 3, 4, 2, 1],
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw?.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#838383',
        },
      },
      y: {
        grid: {
          borderDash: [8, 4],
          color: '#BBBBBB',
          display: false,
        },
        ticks: {
          color: '#838383',
        },
      },
    },
  };

  return (
    <InfoCard
      title={title ?? 'Highest Energy Consumption'}
      headerContainerStyle={{ maxW: '112px' }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Skeleton isLoaded={!isLoading} width="full" mt="10px">
        <VStack width="full" alignItems="flex-start" spacing="21px">
          <Flex height="205px" width="full">
            <Bar data={data} options={options} />
          </Flex>
          <Text lineHeight="22px" color="neutral.800">
            You consumed{' '}
            <Text as="span" lineHeight="22px" color="secondary.purple.500">
              10kWh more{' '}
            </Text>{' '}
            than last week. You used the most energy on{' '}
            <Text as="span" lineHeight="22px" color="secondary.purple.500">
              Monday
            </Text>{' '}
            this week
          </Text>
        </VStack>
      </Skeleton>
    </InfoCard>
  );
};

export default HighestEnergyConsumption;

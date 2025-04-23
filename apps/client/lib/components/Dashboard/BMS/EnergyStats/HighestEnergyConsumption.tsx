import React, { useState } from 'react';
import moment from 'moment';
import InfoCard from '../InfoCard';
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
import { Flex, Skeleton } from '@chakra-ui/react';
import { useGetBMSHighestEnergyConsumptionByFacilityQuery } from '~/lib/redux/services/dashboard/bms.services';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HighestEnergyConsumption = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const { data: energyConsumption, isLoading } =
    useGetBMSHighestEnergyConsumptionByFacilityQuery({});
  const labels = [
    'Awolowo Road Branch',
    'Admiralty Road Branch',
    'Adeola Odeku Branch',
    'Eko Hotel Branch',
    'Bayo Kuku Road Branch',
  ];

  const backgroundColor = [
    '#0E2642',
    '#0E2642CC',
    '#0E264299',
    '#0E264266',
    '#0E264233',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [10, 8, 6, 4, 2],
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
            return `${tooltipItem.raw.toLocaleString()}`;
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
          minRotation: 0,
          maxRotation: 0,
          //@ts-ignore
          callback: function (value, index) {
            //@ts-ignore
            // Optional: manually split long labels if not using array form
            const label = this.getLabelForValue(value);
            return typeof label === 'string' ? label.split(' ') : label;
          },
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
      title="Highest Energy Consumption"
      headerContainerStyle={{ maxW: '112px' }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Skeleton isLoaded={!isLoading} width="full" mt="10px">
        <Flex height="205px" width="full">
          <Bar data={data} options={options} />
        </Flex>
      </Skeleton>
    </InfoCard>
  );
};

export default HighestEnergyConsumption;

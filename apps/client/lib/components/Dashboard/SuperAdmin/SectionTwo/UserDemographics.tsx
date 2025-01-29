import { HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { generateLastFiveYears } from '~/lib/utils/helperFunctions';
import { Option } from '@repo/interfaces';
import DropDown from '../../Common/DropDown';
import CardHeader from '../../Common/CardHeader';

import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Flex } from '@chakra-ui/react';
import { useGetSuperAdminUserDemographicsQuery } from '~/lib/redux/services/dashboard/superadmin.services';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const UserDemographics = () => {
  const { data: demographics } = useGetSuperAdminUserDemographicsQuery();
  const [selectedYear, setSelectedYear] = useState<Option | undefined>(
    generateLastFiveYears()[0] as Option
  );

  const data = {
    labels: demographics?.data?.map((item) => item.stateName) ?? [],
    datasets: [
      {
        label: 'Performance',
        data: demographics?.data?.map((item) => item.usersCount) ?? [],
        backgroundColor: '#00A12933',
        borderColor: '#6CF892',
        borderWidth: 2,
        pointBackgroundColor: '#6CF892',
        pointBorderColor: '#07CC3B1A',
        pointBorderWidth: 1,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#BBBBBB',
        },
        grid: {
          color: '#BBBBBB',
        },
        ticks: {
          display: false,
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 1000,
        pointLabels: {
          color: '#656565',
          font: {
            size: 11,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <VStack
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <CardHeader>User Demographics</CardHeader>
        <DropDown
          options={generateLastFiveYears()}
          label="Year"
          handleClick={(option) => {
            setSelectedYear && setSelectedYear(option);
          }}
          selectedOptions={selectedYear ?? null}
          width="100px"
        />
      </HStack>

      <Flex width="full" height="full">
        <Radar data={data} options={options} />
      </Flex>
    </VStack>
  );
};

export default UserDemographics;

import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, Stack, VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';

const CostBreakdownBySystems = () => {
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );

  const chartLegendItems = [
    {
      label: 'HVAC',
      color: '#4FBAFF',
      value: 20,
    },
    {
      label: 'Lighting',
      color: '#0366EF',
      value: 12,
    },
    {
      label: 'Printer',
      color: '#FF7A37',
      value: 8,
    },
    {
      label: 'Pumps',
      color: '#EABC30',
      value: 10,
    },
    {
      label: 'Office Equipment',
      color: '#07CC3B',
      value: 13,
    },
    {
      label: 'Elevators',
      color: '#392DCA',
      value: 9,
    },
    {
      label: 'Doors',
      color: '#4D55BB',
      value: 30,
    },
  ];

  return (
    <InfoCard
      title="Cost Breakdown by Systems"
      containerStyle={{
        height: 'full',
        spacing: '44px',
      }}
      options={zones}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems="flex-start"
        spacing={{ base: '16px', lg: '74px' }}
        width="full"
      >
        <Flex width="233px">
          <DoughtnutChart
            labels={chartLegendItems.map((item) => item.label)}
            datasets={[
              {
                data: chartLegendItems.map((item) => item.value ?? 0),
                backgroundColor: chartLegendItems.map((item) => item.color),
                borderWidth: 0,
              },
            ]}
            type="full"
            height="233px"
            cutout="60%"
          />
        </Flex>
        <ChartLegend
          chartLegendItems={chartLegendItems}
          containerStyle={{
            direction: 'column',
            spacing: '16px',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
            color: '#B3B3B3',
            fontWeight: 400,
          }}
          boxStyle={{ rounded: 'none' }}
        />
      </Stack>
    </InfoCard>
  );
};

export default CostBreakdownBySystems;

import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, Stack, VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';
import DoughtnutChart from '~/lib/components/Dashboard/Common/Charts/DoughtnutChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { useParams } from 'next/navigation';
import { useGetBMSCostBreakdownBySystemsQuery } from '~/lib/redux/services/dashboard/bms.services';

const CostBreakdownBySystems = () => {
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSCostBreakdownBySystemsQuery(
    { facilityId: id },
    { skip: !id }
  );

  const chartLegendItems = [
    {
      label: 'HVAC',
      color: '#4FBAFF',
      value: data?.data?.hvac,
    },
    {
      label: 'Lighting',
      color: '#0366EF',
      value: data?.data?.lighting,
    },
    {
      label: 'Printer',
      color: '#FF7A37',
      value: data?.data?.printers,
    },
    {
      label: 'Pumps',
      color: '#EABC30',
      value: data?.data?.pumps,
    },
    {
      label: 'Office Equipment',
      color: '#07CC3B',
      value: data?.data?.officeEquipments,
    },
    {
      label: 'Elevators',
      color: '#392DCA',
      value: data?.data?.elevators,
    },
    {
      label: 'Doors',
      color: '#4D55BB',
      value: data?.data?.doors,
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

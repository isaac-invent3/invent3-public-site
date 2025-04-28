import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';
import { Option } from '@repo/interfaces';

const ConditionMonitoringReadings = () => {
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );

  return (
    <InfoCard
      title="Condition Monitoring Readings"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      options={zones}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <ChartLegend
          chartLegendItems={[
            { label: 'Total Energy Consumption', color: '#07CC3B' },
            { label: 'Peak Demand', color: '#EABC30' },
            { label: 'Max Demand', color: '#F50000' },
          ]}
          containerStyle={{
            spacing: '16px',
            mt: '13px',
            direction: 'column',
          }}
          textStyle={{
            whiteSpace: 'nowrap',
          }}
        />
        <LineChart
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July']}
          datasets={[
            {
              label: 'Total Energy Consumption',
              data: [10, 30, 40, 50, 10, 20, 50],
              borderColor: '#07CC3B',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Peak Demand',
              data: [15, 40, 20, 30, 20, 40, 10],
              borderColor: '#EABC30',
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
            {
              label: 'Max Demand',
              data: [15, 30, 10, 24, 28, 50, 10],
              borderColor: '#F50000',
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
          ]}
          isLoading={false}
          showXGrid={false}
          showYGrid={true}
        />
      </VStack>
    </InfoCard>
  );
};

export default ConditionMonitoringReadings;

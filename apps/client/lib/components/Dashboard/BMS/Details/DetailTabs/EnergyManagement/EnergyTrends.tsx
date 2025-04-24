import React from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import ChartLegend from '~/lib/components/Dashboard/Common/Charts/ChartLegend';

const EnergyTrends = () => {
  return (
    <InfoCard
      title="Energy Trends"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <ChartLegend
          chartLegendItems={[
            { label: 'Total Energy Consumption', color: '#17A1FA' },
            { label: 'Peak Demand', color: '#EABC30' },
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
              borderColor: '#17A1FA',
              pointRadius: 0,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
            {
              label: 'Peak Demand',
              data: [15, 40, 20, 30, 20, 40, 10],
              borderColor: '#EABC30',
              borderDash: [8, 4],
              pointRadius: 0,
              fill: false,
              tension: 0.4,
              borderWidth: 2,
            },
          ]}
          isLoading={false}
          showXGrid={false}
          showYGrid={false}
        />
      </VStack>
    </InfoCard>
  );
};

export default EnergyTrends;

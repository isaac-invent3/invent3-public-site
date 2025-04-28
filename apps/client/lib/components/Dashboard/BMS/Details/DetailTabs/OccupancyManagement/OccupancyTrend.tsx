import React from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';

const OccupancyTrend = () => {
  return (
    <InfoCard
      title="Occupancy Trend"
      containerStyle={{
        height: 'full',
        spacing: '22px',
        justifyContent: 'space-between',
      }}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          datasets={[
            {
              label: 'Occupancy Trend',
              data: [10, 30, 40, 50, 10, 20, 50, 80],
              borderColor: '#0366EF',
              pointRadius: 0,
              borderWidth: 1,
              tension: 0.4,
              fill: false,
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

export default OccupancyTrend;

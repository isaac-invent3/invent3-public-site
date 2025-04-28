import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Text, VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';

const TemperatureTrends = () => {
  const [selectedZone, setSelectedZone] = useState<Option | null>(null);
  return (
    <InfoCard
      title="Temperature Trends"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      extraHeader={
        <Text color="neutral.700" fontWeight={700}>
          Over the Last 24H
        </Text>
      }
      options={[
        { label: 'Zone 1', value: 'zone1' },
        { label: 'Zone 2', value: 'zone2' },
      ]}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={[
            '0:00HRS',
            '01:00HRS',
            '02:00HRS',
            '03:00HRS',
            '04:00HRS',
            '05:00HRS',
            '06:00HRS',
            '07:00HRS',
            '08:00HRS',
          ]}
          datasets={[
            {
              label: 'Temperature Trends',
              data: [10, 30, 40, 50, 10, 20, 50, 80],
              borderColor: '#0366EF',
              pointRadius: 3,
              pointHoverBackgroundColor: '#0366EF',
              borderWidth: 1,
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

export default TemperatureTrends;

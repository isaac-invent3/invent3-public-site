import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';

const EnergyCost = () => {
  const zones = [
    { label: 'Zone 1', value: 'zone1' },
    { label: 'Zone 2', value: 'zone2' },
  ];
  const [selectedZone, setSelectedZone] = useState<Option | null>(
    zones[0] as Option
  );

  return (
    <InfoCard
      title="Energy Cost"
      containerStyle={{
        height: 'full',
        spacing: '22px',
      }}
      options={zones}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <VStack alignItems="flex-start" spacing="16px" width="full">
        <LineChart
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July']}
          datasets={[
            {
              label: 'Energy Cost',
              data: [10000, 30000, 40000, 5000, 10000, 20000, 50000],
              borderColor: '#0366EF',
              pointRadius: 2,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
              pointBorderWidth: 4,
              pointBorderColor: '#EABC30',
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

export default EnergyCost;

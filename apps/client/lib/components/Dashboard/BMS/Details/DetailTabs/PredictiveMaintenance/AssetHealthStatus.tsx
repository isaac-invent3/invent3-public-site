import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Stack, Text, VStack } from '@chakra-ui/react';
import LineChart from '~/lib/components/Dashboard/Common/Charts/LineChart';
import { Option } from '@repo/interfaces';
import CircularProgress from '../../../Common/CircularProgress';

const AssetHealthStatus = () => {
  const [selectedZone, setSelectedZone] = useState<Option | null>(null);
  const content = [
    {
      title: 'Healthy',
      color: '#0A9086',
      percentage: 60,
    },
    {
      title: 'Warning',
      color: '#FD941C',
      percentage: 20,
    },
    {
      title: 'Critical',
      color: '#D12E23',
      percentage: 10,
    },
  ];
  return (
    <InfoCard
      title="Asset Health Status"
      containerStyle={{
        height: 'full',
        spacing: '59px',
      }}
      options={[
        { label: 'Zone 1', value: 'zone1' },
        { label: 'Zone 2', value: 'zone2' },
      ]}
      selectedTimeRange={selectedZone}
      setSelectedTimeRange={setSelectedZone}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={{ base: '16px', lg: '40px' }}
        width="full"
      >
        {content.map((item, index) => (
          <VStack key={index} spacing="8px">
            <CircularProgress
              size="140px"
              color={item.color}
              progress={item.percentage}
              innerCircleSize="90px"
              showPercentage
            />
            <Text>{item.title}</Text>
          </VStack>
        ))}
      </Stack>
    </InfoCard>
  );
};

export default AssetHealthStatus;

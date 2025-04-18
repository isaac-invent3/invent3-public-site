import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { Stack, Text } from '@chakra-ui/react';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';

const HighestEnergyConsumption = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );

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
      <Stack width="full" direction={{ base: 'column', lg: 'row' }}></Stack>
    </InfoCard>
  );
};

export default HighestEnergyConsumption;

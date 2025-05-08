import React, { useState } from 'react';
import InfoCard from '../../../InfoCard';
import { Option } from '@repo/interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { DowntrendIcon } from '~/lib/components/CustomIcons';

const CostMonthlySpend = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  return (
    <InfoCard
      title="Cost & Monthly Spend"
      containerStyle={{
        height: 'full',
        spacing: '56px',
      }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
    >
      <VStack alignItems="flex-start" spacing="31px" width="full">
        <VStack spacing="8px" alignItems="flex-start">
          <HStack spacing="6px">
            <Text fontSize="24px" fontWeight={800} color="black">
              N500,875.56
            </Text>
            <HStack spacing="8px">
              <Icon as={DowntrendIcon} boxSize="16px" color="#F50000" />
              <Text color="#F50000">8.2%</Text>
            </HStack>
          </HStack>
          <Text color="primary.accent">Total Monthly Energy Spend</Text>
        </VStack>
        <VStack spacing="8px">
          <Text fontWeight={800} color="black">
            N150 per kWh
          </Text>
          <Text color="primary.accent">Cost per kWh</Text>
        </VStack>
      </VStack>
    </InfoCard>
  );
};

export default CostMonthlySpend;

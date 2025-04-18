import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';

const MostEnergyEfficient = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  return (
    <InfoCard
      title="Most Energy Efficient"
      headerContainerStyle={{ maxW: '112px' }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
      containerStyle={{ pb: '34px' }}
    >
      <Stack
        width="full"
        direction="column"
        mt="40px"
        alignItems="flex-start"
        spacing="28px"
      >
        <VStack spacing="4px" alignItems="flex-start">
          <Text
            maxW="168px"
            color="black"
            fontWeight={800}
            fontSize="24px"
            lineHeight="100%"
          >
            Adeola Odeku Branch
          </Text>
          <Text fontWeight={700} color="neutral.600">
            Victoria Island, Lagos
          </Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="6px">
          <HStack alignItems="flex-end">
            <Text
              color="#00A129"
              fontSize="56px"
              lineHeight="100%"
              fontWeight={800}
            >
              A
              <Text as="sup" fontWeight={800} fontSize="32px">
                +
              </Text>
            </Text>
            <Text color="neutral.700" size="lg" mb="4px">
              Rating
            </Text>
          </HStack>
          <Text fontWeight={800} size="lg">
            25 kWh / sqm
          </Text>
        </VStack>
      </Stack>
    </InfoCard>
  );
};

export default MostEnergyEfficient;

import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';

const TotalEnergyConsumption = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );

  return (
    <InfoCard
      title="Total Energy Consumption"
      extraHeader={
        <Text color="#656565" fontWeight={700}>
          Across All Locations
        </Text>
      }
      headerContainerStyle={{ maxW: '112px' }}
      selectedTimeRange={selectedTimeRange}
      setSelectedTimeRange={setSelectedTimeRange}
      containerStyle={{
        minH: { base: '342px', lg: 'full' },
        justifyContent: 'space-between',
      }}
    >
      <Stack
        width="full"
        direction={{ base: 'column', lg: 'row' }}
        mt={{ base: '16px', lg: '62px' }}
      >
        <VStack
          width={{ base: 'full', lg: '50%' }}
          spacing="16px"
          alignItems="flex-start"
        >
          <HStack spacing="8px">
            <Text
              fontWeight={800}
              fontSize="40px"
              lineHeight="16px"
              color="#F50000"
            >
              120,500
            </Text>
            <Text fontWeight={800} lineHeight="16px" pt="16px">
              kWh
            </Text>
          </HStack>
          <Text fontWeight={800} size="lg">
            Target:
            <Text
              fontWeight={800}
              size="lg"
              as="span"
              ml="8px"
              color="neutral.700"
            >
              110,500
            </Text>
            <Text
              fontWeight={800}
              size="lg"
              as="span"
              ml="8px"
              color="neutral.700"
            >
              kWh
            </Text>
          </Text>
        </VStack>
      </Stack>
    </InfoCard>
  );
};

export default TotalEnergyConsumption;

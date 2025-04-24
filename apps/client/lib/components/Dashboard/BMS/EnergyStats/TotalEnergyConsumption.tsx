import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { Flex, HStack, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { timeRangeOptions } from '~/lib/utils/constants';
import { useGetBMSTotalEnergyConsumptionForAllFacilitiesQuery } from '~/lib/redux/services/dashboard/bms.services';
import dynamic from 'next/dynamic';
const GaugeComponent = dynamic(() => import('react-gauge-component'), {
  ssr: false,
});

const TotalEnergyConsumption = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const { data, isLoading } =
    useGetBMSTotalEnergyConsumptionForAllFacilitiesQuery({});

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
        alignItems="flex-end"
      >
        <VStack
          width={{ base: 'full', lg: '50%' }}
          spacing="16px"
          alignItems="flex-start"
        >
          <HStack spacing="8px">
            <Skeleton isLoaded={!isLoading} as="span">
              <Text
                fontWeight={800}
                fontSize="40px"
                lineHeight="16px"
                color="#F50000"
              >
                {data?.data?.totalEnergyConsumption?.toLocaleString() ?? '-'}
              </Text>
            </Skeleton>
            <Text fontWeight={800} lineHeight="16px" pt="16px">
              kWh
            </Text>
          </HStack>
          <Text fontWeight={800} size="lg">
            Target:
            <Skeleton isLoaded={!isLoading} as="span">
              <Text
                fontWeight={800}
                size="lg"
                as="span"
                ml="8px"
                color="neutral.700"
              >
                {data?.data?.targetEnergyConsumption?.toLocaleString() ?? '-'}
              </Text>
            </Skeleton>
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
        <Flex>
          <GaugeComponent
            arc={{
              gradient: true,
              colorArray: ['#F500000D', '#F50000'],
              subArcs: [],
            }}
            value={0}
            maxValue={0}
            pointer={{ type: 'arrow', elastic: true }}
          />
        </Flex>
      </Stack>
    </InfoCard>
  );
};

export default TotalEnergyConsumption;

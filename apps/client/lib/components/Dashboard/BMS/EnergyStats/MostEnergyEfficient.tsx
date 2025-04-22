import React, { useState } from 'react';
import InfoCard from '../InfoCard';
import { HStack, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { timeRangeOptions } from '~/lib/utils/constants';
import { Option } from '@repo/interfaces';
import { useGetBMSMostEnergyEfficientFacilityQuery } from '~/lib/redux/services/dashboard/bms.services';

const MostEnergyEfficient = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<Option | null>(
    timeRangeOptions[1] as Option
  );
  const { data, isLoading } = useGetBMSMostEnergyEfficientFacilityQuery({});
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
          <Skeleton isLoaded={!isLoading}>
            <Text
              maxW="168px"
              color="black"
              fontWeight={800}
              fontSize="24px"
              lineHeight="100%"
            >
              {data?.data?.facilityName ?? '-'}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight={700} color="neutral.600">
              {data?.data?.address ?? '-'}
            </Text>
          </Skeleton>
        </VStack>
        <VStack alignItems="flex-start" spacing="6px">
          <HStack alignItems="flex-end">
            <Text
              color="#00A129"
              fontSize="56px"
              lineHeight="100%"
              fontWeight={800}
            >
              {data?.data?.rating ?? '-'}
              {/* <Text as="sup" fontWeight={800} fontSize="32px">
                +
              </Text> */}
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

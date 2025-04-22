import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfoCard from './SummaryInfoCard';
import {
  useGetBMSFacilityWithHighestSystemFailuresQuery,
  useGetBMSHighestCostFacilityQuery,
  useGetBMSHighestNonCompliantFacilityQuery,
  useGetBMSHighestOccupancyRateQuery,
} from '~/lib/redux/services/dashboard/bms.services';

const SummaryDetail = () => {
  const { data: highestCostData, isLoading: isLoadingHighestCost } =
    useGetBMSHighestCostFacilityQuery();
  const { data: highestOccupancyData, isLoading: isLoadingHighestOccupancy } =
    useGetBMSHighestOccupancyRateQuery();
  const {
    data: highestNonCompliantData,
    isLoading: isLoadingHighestNonCompliant,
  } = useGetBMSHighestNonCompliantFacilityQuery();
  const {
    data: highestSystemFailure,
    isLoading: isLoadingHighestSystemFailure,
  } = useGetBMSFacilityWithHighestSystemFailuresQuery();

  const content = [
    {
      title: 'Highest Occupancy Rate',
      icon: '/speedometer.gif',
      children: (
        <VStack alignItems="flex-start" spacing="12px">
          <Text
            color="#0366EF"
            fontWeight={800}
            fontSize="24px"
            lineHeight="16px"
          >
            {highestOccupancyData?.data?.occupancyRate}
          </Text>
          <VStack spacing="2px" alignItems="flex-start">
            <Text color="neutral.600" fontWeight={700}>
              Current Occupancy:{' '}
              <Text as="span" color="black" fontWeight={700}>
                {highestOccupancyData?.data?.occupancyRate}
              </Text>
            </Text>
            <Text color="neutral.600" fontWeight={700}>
              Max Occupancy:{' '}
              <Text as="span" color="black" fontWeight={700}>
                {highestOccupancyData?.data?.occupancyRate}
              </Text>
            </Text>
          </VStack>
        </VStack>
      ),
      facilityName: highestOccupancyData?.data?.facilityName,
      address: highestOccupancyData?.data?.address,
    },
    {
      title: 'Most System Failures',
      icon: '/terrorism.gif',
      children: (
        <VStack alignItems="flex-start" spacing="2px">
          <Text color="#F50000" fontWeight={800} size="lg">
            {highestSystemFailure?.data?.CriticalFailureCount ?? '-'}
            <Text as="span" color="#EE5959" fontWeight={700} ml="10px">
              Critical Failures
            </Text>
          </Text>
          <Text color="#F78C1A" fontWeight={800} size="lg">
            {highestSystemFailure?.data?.WarningAlerts ?? '-'}
            <Text as="span" color="#F09A3F" fontWeight={700} ml="10px">
              Warning Alerts
            </Text>
          </Text>
        </VStack>
      ),
      facilityName: highestSystemFailure?.data?.facilityName,
      address: highestSystemFailure?.data?.address,
    },
    {
      title: 'Highest Non-Compliant',
      icon: '/will.gif',
      children: (
        <Text color="#F78C1A" fontWeight={800} size="lg">
          {highestNonCompliantData?.data?.nonCompliances}
          <Text as="span" color="#F09A3F" fontWeight={700} ml="8px">
            Non Compliance
          </Text>
        </Text>
      ),
      facilityName: highestNonCompliantData?.data?.facility,
      address: highestNonCompliantData?.data?.address,
    },
    {
      title: 'Highest Cost Location',
      icon: '/will.gif',
      children: (
        <VStack spacing="4px" alignItems="flex-start">
          <Text color="black" fontWeight={800} size="lg">
            ${highestCostData?.data?.energyCost}
            <Text as="span" color="neutral.600" fontWeight={700} ml="8px">
              Energy Cost
            </Text>
          </Text>
          <Text color="black" fontWeight={800} size="lg">
            ${highestCostData?.data?.waterCost}
            <Text as="span" color="neutral.600" fontWeight={700} ml="8px">
              Water Cost
            </Text>
          </Text>
        </VStack>
      ),
      facilityName: highestCostData?.data?.facility,
      address: highestCostData?.data?.address,
    },
  ];
  return (
    <SimpleGrid width="full" gap="16px" columns={{ base: 1, md: 2, lg: 4 }}>
      {content.map((item, index) => (
        <SummaryInfoCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default SummaryDetail;

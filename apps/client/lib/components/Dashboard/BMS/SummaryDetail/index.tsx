import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfoCard from './SummaryInfoCard';

const SummaryDetail = () => {
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
            90%
          </Text>
          <VStack spacing="2px" alignItems="flex-start">
            <Text color="neutral.600" fontWeight={700}>
              Current Occupancy:{' '}
              <Text as="span" color="black" fontWeight={700}>
                450
              </Text>
            </Text>
            <Text color="neutral.600" fontWeight={700}>
              Max Occupancy:{' '}
              <Text as="span" color="black" fontWeight={700}>
                500
              </Text>
            </Text>
          </VStack>
        </VStack>
      ),
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Most System Failures',
      icon: '/terrorism.gif',
      children: (
        <VStack alignItems="flex-start" spacing="2px">
          <Text color="#F50000" fontWeight={800} size="lg">
            05
            <Text as="span" color="#EE5959" fontWeight={700} ml="10px">
              Critical Failures
            </Text>
          </Text>
          <Text color="#F78C1A" fontWeight={800} size="lg">
            12
            <Text as="span" color="#F09A3F" fontWeight={700} ml="10px">
              Warning Alerts
            </Text>
          </Text>
        </VStack>
      ),
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Highest Non-Compliant',
      icon: '/will.gif',
      children: (
        <Text color="#F78C1A" fontWeight={800} size="lg">
          30
          <Text as="span" color="#F09A3F" fontWeight={700} ml="8px">
            Non Compliance
          </Text>
        </Text>
      ),
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
    },
    {
      title: 'Highest Cost Location',
      icon: '/will.gif',
      children: (
        <VStack spacing="4px" alignItems="flex-start">
          <Text color="black" fontWeight={800} size="lg">
            $5,500
            <Text as="span" color="neutral.600" fontWeight={700} ml="8px">
              Energy Cost
            </Text>
          </Text>
          <Text color="black" fontWeight={800} size="lg">
            $1,200
            <Text as="span" color="neutral.600" fontWeight={700} ml="8px">
              Water Cost
            </Text>
          </Text>
        </VStack>
      ),
      facilityName: 'Adeola Odeku Branch',
      lgaName: 'Victoria Island',
      stateName: 'Lagos',
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

import { HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryCard from '../../../Common/SummaryCard';
import { useParams } from 'next/navigation';
import { useGetBMSOccupancyManagementQuery } from '~/lib/redux/services/dashboard/bms.services';

const Summary = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSOccupancyManagementQuery(
    { facilityId: id },
    { skip: !id }
  );

  const summaryData = [
    {
      title: 'Total Zones',
      value: data?.data?.totalZones ?? '-',
      icon: '/location.png',
    },
    {
      title: 'Current vs. Maximum Occupancy',
      value: data?.data?.currentOccupancy ?? '-',
      icon: '/location.png',
      children: (
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing={0}>
            <Text>
              <Text
                as="span"
                fontWeight={800}
                fontSize="16px"
                lineHeight="150%"
              >
                75
              </Text>{' '}
              out of{' '}
              <Text
                as="span"
                fontWeight={800}
                fontSize="16px"
                lineHeight="150%"
              >
                100
              </Text>
            </Text>
            <Text color="neutral.600">in Open Office</Text>
          </VStack>
          <VStack alignItems="flex-start" spacing={0}>
            <Text>
              <Text
                as="span"
                fontWeight={800}
                fontSize="16px"
                lineHeight="150%"
              >
                8
              </Text>{' '}
              out of{' '}
              <Text
                as="span"
                fontWeight={800}
                fontSize="16px"
                lineHeight="150%"
              >
                12
              </Text>
            </Text>
            <Text color="neutral.600">in Meeting Room</Text>
          </VStack>
        </HStack>
      ),
    },
    {
      title: 'Space Utilization by Department',
      value: data?.data?.occupancyRate ?? '-',
      subtitle: 'All zones',
      icon: '/location.png',
      children: (
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              85%
            </Text>
            <Text color="neutral.600">Human Resources</Text>
          </VStack>
          <VStack alignItems="flex-start" spacing={0}>
            <Text fontWeight={800} fontSize="24px" lineHeight="100%">
              70%
            </Text>
            <Text color="neutral.600">Information Technology</Text>
          </VStack>
        </HStack>
      ),
    },
    {
      title: 'Meeting Room Availability',
      value: data?.data?.occupancySensorHealth ?? '-',
      subtitle: 'All zones',
      icon: '/location.png',

      children: (
        <VStack alignItems="flex-start" spacing={0}>
          <Text>
            <Text as="span" fontWeight={800} fontSize="16px" lineHeight="150%">
              3
            </Text>{' '}
            out of{' '}
            <Text as="span" fontWeight={800} fontSize="16px" lineHeight="150%">
              5
            </Text>
          </Text>
          <Text color="neutral.600">rooms available</Text>
        </VStack>
      ),
    },
  ];

  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
    >
      {summaryData.map((item, index) => (
        <SummaryCard
          {...item}
          key={index}
          isLoading={isLoading}
          containerStyle={{ justifyContent: 'space-between' }}
        />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

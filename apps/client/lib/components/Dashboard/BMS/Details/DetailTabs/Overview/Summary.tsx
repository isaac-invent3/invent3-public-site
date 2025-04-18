import { Flex, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface SummaryCardProps {
  title: string;
  subtitle: string;
  value: string;
  icon: string;
}
const SummaryCard = (props: SummaryCardProps) => {
  const { title, subtitle, value, icon } = props;
  return (
    <VStack
      width="full"
      spacing="16px"
      alignItems="flex-start"
      rounded="8px"
      bgColor="neutral.200"
      p="16px"
    >
      <HStack width="full" justifyContent="space-between" spacing="24px">
        <Text color="neutral.800" fontWeight={800} size="md">
          {title}
        </Text>
        <Flex position="relative" width="24px" height="24px">
          <Image src={icon} alt="icon" fill />
        </Flex>
      </HStack>
      <VStack alignItems="flex-start" spacing="8px">
        <Text fontWeight={800} size="xl">
          {value}
        </Text>
        <Text color="neutral.600">{subtitle}</Text>
      </VStack>
    </VStack>
  );
};

const Summary = () => {
  const content = [
    {
      title: 'Occupancy Rate',
      subtitle: 'All zones',
      value: '90%',
      icon: '/adjust.png',
    },
    {
      title: 'Total Zones',
      subtitle: 'No of Zones',
      value: '4',
      icon: '/location.png',
    },
    {
      title: 'Avg Maintenance Time',
      subtitle: 'All zones',
      value: '2 hours',
      icon: '/clock.png',
    },
    {
      title: 'Total  Faults Detetcted',
      subtitle: 'No of Faults',
      value: '3 Faults',
      icon: '/fault.png',
    },
    {
      title: 'Scheduled Maintenance',
      subtitle: 'This Week',
      value: '5',
      icon: '/bms-calendar.png',
    },
  ];
  return (
    <SimpleGrid
      width="full"
      gap="16px"
      columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
    >
      {content.map((item, index) => (
        <SummaryCard {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

export default Summary;

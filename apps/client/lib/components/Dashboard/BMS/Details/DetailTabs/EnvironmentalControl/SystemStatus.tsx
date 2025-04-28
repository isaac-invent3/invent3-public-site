import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

const SystemStatus = () => {
  const statusContent = [
    {
      title: 'HVAC System Status',
      content: (
        <Text color="#F50000" fontWeight={600}>
          35%
        </Text>
      ),
      icon: '/system-status-hvac.png',
    },
    {
      title: 'Last Maintenance',
      content: <Text fontWeight={600}>01/04/2025</Text>,
      icon: '/system-status-calendar.png',
    },
    {
      title: 'Sensor Connectivity',
      content: <Text fontWeight={600}>01/04/2025</Text>,
      icon: '/system-status-sensor.png',
    },
    {
      title: 'Filter Status',
      content: (
        <Text color="#07CC3B" fontWeight={600}>
          60%
        </Text>
      ),
      icon: '/system-status-filter.png',
    },
  ];
  return (
    <InfoCard
      title="System Status"
      containerStyle={{
        height: 'full',
        spacing: '45px',
      }}
    >
      <HStack
        width="full"
        spacing={{ base: '24px', lg: '40px' }}
        alignItems="flex-start"
      >
        {statusContent.map((item, index) => (
          <VStack spacing="8px" key={index}>
            <Flex position="relative" width="24px" height="24px">
              <Image src={item.icon} alt="icon" fill />
            </Flex>
            <Text color="primary.500" fontWeight={700}>
              {item.title}
            </Text>
            {item.content}
          </VStack>
        ))}
      </HStack>
    </InfoCard>
  );
};

export default SystemStatus;

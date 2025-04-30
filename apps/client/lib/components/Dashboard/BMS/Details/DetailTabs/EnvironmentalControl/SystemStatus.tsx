import React from 'react';
import InfoCard from '../../../InfoCard';
import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useGetBMSSystemStatusQuery } from '~/lib/redux/services/dashboard/bms.services';
import { useParams } from 'next/navigation';
import { dateFormatter } from '~/lib/utils/Formatters';

const SystemStatus = () => {
  const params = useParams();
  const id = params?.id as unknown as number;
  const { data, isLoading } = useGetBMSSystemStatusQuery(
    { facilityId: id },
    { skip: !id }
  );

  const statusContent = [
    {
      title: 'HVAC System Status',
      content: (
        <Text
          color="#F50000"
          fontSize="28px"
          lineHeight="100%"
          fontWeight={800}
        >
          {data?.data?.hvacSystemStatus}
        </Text>
      ),
      icon: '/system-status-hvac.png',
    },
    {
      title: 'Last Maintenance',
      content: (
        <Text fontSize="28px" lineHeight="100%" fontWeight={800}>
          {dateFormatter(data?.data?.lastMaintenanceDate, 'DD/MM/YYYY')}
        </Text>
      ),
      icon: '/system-status-calendar.png',
    },
    {
      title: 'Sensor Connectivity',
      content: (
        <Text fontSize="28px" lineHeight="100%" fontWeight={800}>
          {data?.data?.sensorConnectivity ?? '-'}
        </Text>
      ),
      icon: '/system-status-sensor.png',
    },
    {
      title: 'Filter Status',
      content: (
        <Text
          color="#07CC3B"
          fontSize="28px"
          lineHeight="100%"
          fontWeight={800}
        >
          {data?.data?.filterStatus ?? '-'}
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
        alignItems: 'flex-start',
      }}
    >
      <HStack
        width="full"
        spacing={{ base: '24px', lg: '40px' }}
        alignItems="flex-start"
        justifyContent="space-between"
        maxW="90%"
      >
        {statusContent.map((item, index) => (
          <VStack spacing="8px" key={index}>
            <Flex position="relative" width="24px" height="24px">
              <Image src={item.icon} alt="icon" fill />
            </Flex>
            {item.content}
            <Text color="neutral.600">{item.title}</Text>
          </VStack>
        ))}
      </HStack>
    </InfoCard>
  );
};

export default SystemStatus;

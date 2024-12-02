import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { MaintenanceSchedule } from '~/lib/interfaces/maintenance.interfaces';

interface HeaderInfoProps {
  data: MaintenanceSchedule;
}

const HeaderInfo = (props: HeaderInfoProps) => {
  const { data } = props;

  const firstInfo = [
    {
      label: 'Asset Name',
      value: `${data?.assetId} - ${data?.assetName}`,
    },
    {
      label: 'Location',
      value: data?.assetLocation ?? 'N/A',
    },
  ];

  return (
    <HStack
      width="full"
      bgColor="primary.500"
      p="16px"
      roundedTop="8px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <HStack spacing="40px">
        {firstInfo.map((item, index) => (
          <VStack alignItems="flex-start" spacing="8px" key={index}>
            <Text color="neutral.300">{item.label}</Text>
            <Text
              color="white"
              fontWeight={700}
              fontSize="14px"
              lineHeight="22px"
              maxW="278px"
            >
              {item.value}
            </Text>
          </VStack>
        ))}
      </HStack>
      <VStack alignItems="flex-start" spacing="4px">
        <Text color="neutral.300">Maintenance Plan</Text>
        <HStack spacing="8px">
          <Text
            color="white"
            fontWeight={700}
            fontSize="14px"
            lineHeight="22px"
            maxW="278px"
          >
            {data?.planName}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default HeaderInfo;

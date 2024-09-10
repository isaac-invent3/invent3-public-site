import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const User = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { currentOwner, departmentName, buildingName, roomName } = assetData;

  const info = [
    {
      label: 'Department',
      value: departmentName ?? 'N/A',
    },
    {
      label: 'Location',
      value: [buildingName, roomName].filter(Boolean).join(', ') || 'N/A',
    },
  ];

  return (
    <HStack width="full" spacing="24px" alignItems="flex-start">
      <Avatar width="99px" height="99px" src="" />
      <VStack spacing="24px" alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="8px">
          <Heading
            as="h5"
            fontSize="16px"
            lineHeight="19.01px"
            fontWeight={700}
            color="black"
          >
            {currentOwner}
          </Heading>
          <Text color="neutral.600">Operation Manager</Text>
        </VStack>
        <VStack alignItems="flex-start" spacing="8px">
          {info.map((item) => (
            <HStack width="full" justifyContent="space-between">
              <Text size="md" color="neutral.600" minW="78px">
                {item.label}
              </Text>
              <Text size="md" color="black">
                {item.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </HStack>
  );
};

export default User;

import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface UserProps {
  name: string | null;
  role: string | null;
  location: string | null;
  department: string | null;
}
const User = (props: UserProps) => {
  const { name, role, department, location } = props;

  const info = [
    {
      label: 'Department',
      value: department ?? 'N/A',
    },
    {
      label: 'Location',
      value: location ?? 'N/A',
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
            {name}
          </Heading>
          <Text color="neutral.600">{role}</Text>
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

import { HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  const permissionTypes = ['Create', 'Read', 'Update', 'Delete'];

  return (
    <HStack
      width="full"
      justifyContent="space-between"
      py="16px"
      px="32px"
      bgColor="#B4BFCAE5"
    >
      <Text color="black" fontWeight={700} size="md" width="60%">
        Modules
      </Text>
      <SimpleGrid width="40%" columns={4}>
        {permissionTypes.map((item, index) => (
          <Text color="black" key={index}>
            {item}
          </Text>
        ))}
      </SimpleGrid>
    </HStack>
  );
};

export default Header;

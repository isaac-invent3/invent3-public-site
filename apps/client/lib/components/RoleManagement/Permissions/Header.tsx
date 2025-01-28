import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
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
      <Text color="black" fontWeight={700} size="md" width="40%">
        Description
      </Text>
    </HStack>
  );
};

export default Header;

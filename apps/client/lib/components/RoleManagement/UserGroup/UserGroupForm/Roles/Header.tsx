import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      py="16px"
      px={{ base: '16px', lg: '32px' }}
      bgColor="#B4BFCAE5"
    >
      <Text color="black" fontWeight={700} size="md" width="60%">
        Roles
      </Text>
      <Text
        color="black"
        fontWeight={700}
        size="md"
        width="40%"
        display={{ base: 'none', md: 'flex' }}
      >
        Description
      </Text>
    </HStack>
  );
};

export default Header;

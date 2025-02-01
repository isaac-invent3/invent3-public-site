import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import VendorManagement from './VendorManagement';
import UserActivity from './UserActivity';

const SectionFive = () => {
  return (
    <HStack spacing="16px" width="full" minH="382px">
      <Flex width="54%" height="full">
        <VendorManagement />
      </Flex>
      <Flex width="45%" height="full">
        <UserActivity />
      </Flex>
    </HStack>
  );
};

export default SectionFive;

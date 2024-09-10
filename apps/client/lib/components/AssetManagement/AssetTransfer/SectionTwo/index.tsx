import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import NewOwner from './NewOwner';
import TransferDetails from './TransferDetails';

const SectionTwo = () => {
  return (
    <Flex gap="112px" width="full">
      <Flex width="40%">
        <NewOwner />
      </Flex>
      <Flex width="60%">
        <HStack width="full" alignItems="flex-end" spacing="45px">
          <Flex width="70%">
            <TransferDetails />
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default SectionTwo;

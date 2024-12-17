import { Flex } from '@chakra-ui/react';

import NewOwner from './NewOwner';
import TransferDetails from './TransferDetails';
import NewLocation from './NewLocation';

const SectionTwo = () => {
  return (
    <Flex gap="44px" width="full">
      <Flex width="40%">
        <NewOwner />
      </Flex>
      <Flex width="60%" gap="24px">
        <Flex width="48%">
          <NewLocation newLocation="" />
        </Flex>
        <Flex width="52%">
          <TransferDetails />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionTwo;

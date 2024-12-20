import { Flex } from '@chakra-ui/react';

import NewOwner from './NewOwner';
import TransferDetails from './TransferDetails';
import NewLocation from './NewLocation';
import { useState } from 'react';

const SectionTwo = () => {
  const [newLocation, setNewLocation] = useState('');
  return (
    <Flex gap="44px" width="full">
      <Flex width="40%">
        <NewOwner setNewLocation={setNewLocation} />
      </Flex>
      <Flex width="60%" gap="24px">
        <Flex width="48%">
          <NewLocation newLocation={newLocation} />
        </Flex>
        <Flex width="52%">
          <TransferDetails />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SectionTwo;

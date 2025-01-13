import { Flex } from '@chakra-ui/react';

import NewOwner from './NewOwner';
import TransferDetails from './TransferDetails';
import NewLocation from './NewLocation';
import { useState } from 'react';

const SectionTwo = () => {
  const [newLocation, setNewLocation] = useState('');
  return (
    <Flex gap="32px" width="full">
      <NewOwner setNewLocation={setNewLocation} />

      <NewLocation newLocation={newLocation} />

      <TransferDetails />
    </Flex>
  );
};

export default SectionTwo;

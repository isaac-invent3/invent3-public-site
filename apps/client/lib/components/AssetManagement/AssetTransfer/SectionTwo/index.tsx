import { SimpleGrid } from '@chakra-ui/react';

import NewOwner from './NewOwner';
import TransferDetails from './TransferDetails';
import NewLocation from './NewLocation';
import { useState } from 'react';

const SectionTwo = () => {
  const [newLocation, setNewLocation] = useState('');
  return (
    <SimpleGrid
      gap={{ base: '20px', lg: '32px' }}
      width="full"
      columns={{ base: 1, lg: 3 }}
    >
      <NewOwner setNewLocation={setNewLocation} />

      <NewLocation newLocation={newLocation} />

      <TransferDetails />
    </SimpleGrid>
  );
};

export default SectionTwo;

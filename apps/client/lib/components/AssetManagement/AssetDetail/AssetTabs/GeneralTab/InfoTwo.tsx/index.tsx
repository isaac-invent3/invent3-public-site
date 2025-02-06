import { Flex, SimpleGrid } from '@chakra-ui/react';
import MapView from './MapView';
import OwnersInfo from './OwnersInfo';

const InfoTwo = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2 }}
      width="full"
      gap={{ base: '16px', md: '74px' }}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Flex display={{ base: 'none', sm: 'flex' }}>
        <OwnersInfo />
      </Flex>
      <MapView />
    </SimpleGrid>
  );
};

export default InfoTwo;

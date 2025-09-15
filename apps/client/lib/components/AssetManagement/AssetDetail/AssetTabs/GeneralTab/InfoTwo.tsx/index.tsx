import { Flex, SimpleGrid } from '@chakra-ui/react';
import OwnersInfo from '../InfoOne/OwnersInfo';
import dynamic from 'next/dynamic';

const MapViewDynamic = dynamic(() => import('./MapView'), { ssr: false });

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
      {/* <MapViewDynamic /> */}
    </SimpleGrid>
  );
};

export default InfoTwo;

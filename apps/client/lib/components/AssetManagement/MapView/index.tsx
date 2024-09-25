import { Flex } from '@chakra-ui/react';
import React from 'react';
import MapViewComponent from './Map';

const MapView = () => {
  return (
    <Flex width="full" height="600px">
      {' '}
      {/* Set a specific height for the Flex container */}
      <MapViewComponent
        assetData={{
          Lagos: 25,
          Kano: 12,
          Kaduna: 5,
        }}
      />
    </Flex>
  );
};

export default MapView;

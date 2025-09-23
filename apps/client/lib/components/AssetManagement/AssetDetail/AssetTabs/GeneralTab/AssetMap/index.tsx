import { Box, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import CountMarker from './CountMarker';
import NIGERIA_CORDINATES from '~/lib/utils/NigeriaCordinates';
import { useAppSelector } from '~/lib/redux/hooks';

const AssetMap = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { stateName } = assetData;

  return (
    <VStack
      height="full"
      // p="20px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
      position="relative"
      overflow="hidden"
    >
      <Skeleton
        width="full"
        height="full"
        minH="286px"
        overflow="hidden"
        isLoaded
      >
        <Box width="full" height="full" minH="286px" overflow="hidden">
          <Map
            /* @ts-ignore */
            height="100%"
            defaultCenter={NIGERIA_CORDINATES.states?.[stateName as 'Abia']}
            defaultZoom={6}
            attribution={false}
          >
            <Marker
              anchor={NIGERIA_CORDINATES.states?.[stateName as 'Abia']}
              style={{ pointerEvents: 'auto' }}
              hover={true}
              payload={{ name }}
            >
              <CountMarker />
            </Marker>
          </Map>
        </Box>
      </Skeleton>
    </VStack>
  );
};

export default AssetMap;

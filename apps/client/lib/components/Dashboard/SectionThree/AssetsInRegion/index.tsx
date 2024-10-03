import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { useGetAssetsInRegionQuery } from '~/lib/redux/services/dashboard.services';
import { useAppSelector } from '~/lib/redux/hooks';
import CardHeader from '../../Common/CardHeader';
import CountMarker from './CountMarker';

const AssetsInRegion = () => {
  const position = [8.6753, 9.082];
  const { selectedCountry, selectedState } = useAppSelector(
    (state) => state.dashboard.info
  );
  const { isLoading } = useGetAssetsInRegionQuery({
    id: selectedCountry?.value,
    ...(selectedState?.value ? { regionId: selectedState?.value } : {}),
    pageSize: 45,
  });
  return (
    <VStack
      width="full"
      height="full"
      pt="26px"
      px="16px"
      pb="17px"
      alignItems="flex-start"
      spacing="20px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Assets in Region</CardHeader>
      <Skeleton isLoaded={!isLoading} width="full">
        <Box width="full" height="275px" bgColor="red">
          {position ? (
            <Map
              height={275}
              defaultCenter={[8.6753, 9.082]}
              defaultZoom={7}
              attribution={false}
            >
              <Marker
                width={50}
                anchor={[8.6753, 9.082]}
                onMouseOver={() => console.log('heelo')}
                hover={true}
              >
                <CountMarker name="Lagos" value={50} externalHover={false} />
              </Marker>
            </Map>
          ) : (
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="neutral.100"
            >
              <Text color="neutral.600">Location data not available</Text>
            </Box>
          )}
        </Box>
      </Skeleton>
    </VStack>
  );
};

export default AssetsInRegion;

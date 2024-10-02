import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../Common/CardHeader';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import '~/lib/styles/custom-leaflet.css';

const AssetsInRegion = () => {
  const position: LatLngExpression = [8.6753, 9.082];
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
      <Box width="full" height="275px" bgColor="red">
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            attributionControl={false}
            dragging={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
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
    </VStack>
  );
};

export default AssetsInRegion;

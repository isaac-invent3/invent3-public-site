import { Box, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import '~/lib/styles/custom-leaflet.css';
import { useAppSelector } from '~/lib/redux/hooks';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'asset-map-marker.svg',
  iconSize: [24, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapView = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { facilityLatitude, facilityLongitude } = assetData;

  const hasCoordinates = facilityLatitude && facilityLongitude;
  const position: LatLngExpression = hasCoordinates
    ? [facilityLatitude, facilityLongitude]
    : [0, 0];

  return (
    <VStack alignItems="flex-start" spacing="8px" width="full">
      <DetailHeader variant="secondary">Map</DetailHeader>
      <Box width="full" height="133px">
        {hasCoordinates ? (
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
            <Marker position={position} icon={customIcon} />
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

export default MapView;

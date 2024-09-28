import { Marker } from 'react-leaflet';
import {
  Popover,
  PopoverContent,
  PopoverBody,
  Text,
  HStack,
  Flex,
  Icon as ChakraIcon,
  VStack,
  PopoverArrow,
} from '@chakra-ui/react';
import { Icon, LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { AssetIcon } from '~/lib/components/CustomIcons';

// Custom icon configuration with centered anchor
const customIcon = new Icon({
  iconUrl: 'asset-map-marker.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12], // Center the icon
  popupAnchor: [0, -20],
});

interface CustomMarkerProps {
  name: string;
  assetCount: number;
  cordinates: {
    [key: string]: LatLngExpression;
  } | null;
}

const CustomMarker = (props: CustomMarkerProps) => {
  const { name, assetCount, cordinates } = props;
  const [isHovered, setIsHovered] = useState(false);

  if (cordinates && cordinates[name]) {
    return (
      <Marker
        position={cordinates[name]}
        icon={customIcon}
        eventHandlers={{
          mouseover: (event) => {
            setIsHovered(true);
            event.target.openPopup();
          },
          mouseout: () => {
            setIsHovered(false);
          },
        }}
      >
        {/* <Popup> */}
        <Popover isOpen={isHovered} trigger="hover" placement="top">
          <PopoverContent width="max-content" p={0} m={0}>
            <PopoverArrow />
            <PopoverBody p={0} m={0} py="3px" pl="3px" pr="15px">
              <HStack spacing="4px">
                <Flex
                  width="24px"
                  height="24px"
                  rounded="6px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="#07CC3B33"
                >
                  <ChakraIcon as={AssetIcon} boxSize="24px" color="#00A129" />
                </Flex>
                <VStack alignItems="flex-start" spacing={0}>
                  <Text
                    fontSize="10px"
                    lineHeight="11.88px"
                    color="neutral.600"
                  >
                    {name}
                  </Text>
                  <Text fontWeight={800} color="primary.500">
                    {assetCount.toLocaleString()}
                  </Text>
                </VStack>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {/* </Popup> */}
      </Marker>
    );
  }
  return null;
};

export default CustomMarker;

import { useState } from 'react';
import { Flex, HStack, Icon, Text, VStack, Box } from '@chakra-ui/react';
import { Marker } from 'react-simple-maps';
import { FacilityMapIcon } from '~/lib/components/CustomIcons';

interface CustomMarkerProps {
  name: string;
  count: number;
  coordinates: [number, number];
  setHoveredMarker: React.Dispatch<React.SetStateAction<string | null>>; // Add this prop
}

const CustomMarker = (props: CustomMarkerProps) => {
  const { name, count, coordinates, setHoveredMarker } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Marker
      coordinates={coordinates}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredMarker(name); // Update hovered marker
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredMarker(null); // Clear hovered marker
      }}
    >
      {/* Marker Icon */}
      <foreignObject x={-20} y={-20} width={40} height={40}>
        <Flex
          width="40px"
          height="40px"
          rounded="full"
          bgColor={isHovered ? '#00A1291A' : 'none'}
          justifyContent="center"
          alignItems="center"
          transition="background-color 0.3s ease"
        >
          <Flex
            rounded="full"
            bgColor="white"
            width={isHovered ? '14px' : '24px'}
            height={isHovered ? '14px' : '24px'}
            justifyContent="center"
            alignItems="center"
            transition="width 0.3s ease, height 0.3s ease"
          >
            <Flex
              rounded="full"
              borderWidth="1px"
              borderColor="#00A129"
              width={isHovered ? '12px' : '20px'}
              height={isHovered ? '12px' : '20px'}
              justifyContent="center"
              alignItems="center"
              transition="width 0.3s ease, height 0.3s ease"
            >
              {!isHovered && (
                <Icon
                  as={FacilityMapIcon}
                  boxSize="16px"
                  color="#00A129"
                  position="relative"
                  zIndex={9}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </foreignObject>

      {/* Tooltip simulation on hover */}
      {isHovered && (
        <foreignObject x={-30} y={-47} width={90} height={45} radius={8}>
          <Flex direction="column" width="full">
            <HStack
              spacing="4px"
              bgColor="white"
              p="3px"
              rounded="8px"
              height="full"
              width="full"
            >
              <Flex
                width="24px"
                height="24px"
                rounded="6px"
                justifyContent="center"
                alignItems="center"
                bgColor="#00A1291A"
                shrink={0}
              >
                <Icon as={FacilityMapIcon} boxSize="16px" color="#00A129" />
              </Flex>
              <VStack alignItems="flex-start" spacing={0}>
                <Text
                  color="neutral.600"
                  fontSize="10px"
                  lineHeight="11.88px"
                  fontWeight={500}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  noOfLines={1}
                >
                  {name}
                </Text>
                <Text color="primary.500" fontWeight={800}>
                  {count?.toLocaleString()}
                </Text>
              </VStack>
            </HStack>

            {/* Inverted Arrow */}
            <Box
              width="0"
              height="0"
              borderLeft="9px solid transparent"
              borderRight="9px solid transparent"
              borderTop="11px solid white"
              position="relative"
              top="-3px"
              ml="20px"
              borderRadius="4px"
              zIndex={1}
            />
          </Flex>
        </foreignObject>
      )}
    </Marker>
  );
};

export default CustomMarker;

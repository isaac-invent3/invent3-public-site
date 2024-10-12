import { useState } from 'react';
import { Flex, HStack, Icon, Text, VStack, Box } from '@chakra-ui/react';
import { AssetIcon, NairaIcon } from '~/lib/components/CustomIcons';
import { Marker } from 'react-simple-maps';

interface CustomMarkerProps {
  name: string;
  assetCount: number;
  value: number;
  coordinates: [number, number];
  isInUse: boolean;
  type: 'count' | 'value';
  setHoveredMarker: React.Dispatch<React.SetStateAction<string | null>>; // Add this prop
}

const CustomMarker = (props: CustomMarkerProps) => {
  const {
    name,
    assetCount,
    coordinates,
    setHoveredMarker,
    isInUse,
    type,
    value,
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = isInUse ? '#00A1291A' : '#EABC300D';
  const iconColor = isInUse ? '#00A129' : '#EABC30';
  const icon = type === 'count' ? AssetIcon : NairaIcon;
  const displayValue = type === 'count' ? assetCount : value;

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
          bgColor={isHovered ? bgColor : 'none'}
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
              borderColor={iconColor}
              width={isHovered ? '12px' : '20px'}
              height={isHovered ? '12px' : '20px'}
              justifyContent="center"
              alignItems="center"
              transition="width 0.3s ease, height 0.3s ease"
            >
              {!isHovered && (
                <Icon
                  as={icon}
                  boxSize={type === 'count' ? '16px' : '12px'}
                  color={iconColor}
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
        <foreignObject
          x={-30}
          y={-47}
          width={type === 'value' ? 100 : 90}
          height={45}
          radius={8}
        >
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
                bgColor={bgColor}
                shrink={0}
              >
                <Icon
                  as={icon}
                  boxSize={type === 'count' ? '16px' : '12px'}
                  color={iconColor}
                />
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
                  {displayValue.toLocaleString()}
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

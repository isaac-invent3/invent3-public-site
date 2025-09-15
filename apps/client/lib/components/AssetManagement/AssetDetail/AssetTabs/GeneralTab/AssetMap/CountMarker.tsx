import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface CountMarkerProps {
  name: string | null;
  value: number;
  externalHover: boolean;
}

const CountMarker = (props: CountMarkerProps) => {
  const { value, name, externalHover } = props;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (externalHover) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [externalHover]);

  return (
    <Flex direction="column" position="absolute" width="full">
      {isHovered && (
        <Flex
          direction="column"
          minW="min-content"
          position="absolute"
          top={-8}
        >
          <HStack
            spacing="4px"
            bgColor="white"
            py="4px"
            px="8px"
            rounded="8px"
            height="full"
            width="full"
          >
            <Text
              color="neutral.600"
              fontWeight={500}
              whiteSpace="nowrap"
              width="full"
            >
              {name}
            </Text>
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
            ml="10px"
            borderRadius="4px"
            zIndex={1}
          />
        </Flex>
      )}
      <Flex
        p="7.5px"
        rounded="full"
        bgColor="#00A129"
        cursor="pointer"
        minW="32px"
        minH="32px"
        shrink={0}
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontWeight={800} size="md">
          {value}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CountMarker;

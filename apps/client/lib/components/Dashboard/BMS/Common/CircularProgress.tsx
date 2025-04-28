import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface CircularProgressProps {
  progress: number;
  children?: React.ReactNode;
  size: string;
  color: string;
  showPercentage?: boolean;
  innerCircleSize: string;
}
const CircularProgress = (props: CircularProgressProps) => {
  const { progress, children, size, color, showPercentage, innerCircleSize } =
    props;
  return (
    <Flex
      width={size}
      height={size}
      rounded="full"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      {/* Outer circle with neutral background */}
      <Box
        width={size}
        height={size}
        rounded="full"
        bg="#E0E0E0"
        position="absolute"
      />

      {/* Gradient progress ring */}
      <Box
        width={size}
        height={size}
        rounded="full"
        position="absolute"
        bg={`conic-gradient(
                  ${color} ${progress}%,
                  #E0E0E0 ${progress}%
                )`}
      />

      {/* Inner circle to create ring appearance */}
      <Flex
        width={innerCircleSize}
        height={innerCircleSize}
        rounded="full"
        bg="#F2F1F1"
        zIndex={1}
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing="2px">
          {showPercentage && (
            <Text fontWeight={600} fontSize="24px" lineHeight="100%">
              {progress}
            </Text>
          )}
          {children}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default CircularProgress;

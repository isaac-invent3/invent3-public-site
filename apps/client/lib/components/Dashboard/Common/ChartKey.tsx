import { Box, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface ChartKeyProps {
  chartKeyItems: { label: string; color: string; children?: React.ReactNode }[];
  containerStyle?: StackProps;
}

const ChartKey = ({ chartKeyItems, containerStyle }: ChartKeyProps) => {
  return (
    <HStack spacing="16px" {...containerStyle}>
      {chartKeyItems.map((item, index) => (
        <HStack spacing="8px" key={index} alignItems="flex-start">
          <Box
            flexShrink={0}
            width="10px"
            height="10px"
            rounded="full"
            bgColor={item.color}
            mt="1px"
          />
          <VStack alignItems="flex-start" spacing="4px" m={0} p={0}>
            <Text color="neutral.600" fontWeight={700}>
              {item.label}
            </Text>
            {item.children}
          </VStack>
        </HStack>
      ))}
    </HStack>
  );
};

export default ChartKey;

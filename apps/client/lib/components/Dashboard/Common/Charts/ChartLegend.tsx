import {
  Box,
  HStack,
  Stack,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface ChartLegendProps {
  chartLegendItems: {
    label: string;
    color: string;
    children?: React.ReactNode;
  }[];
  containerStyle?: StackProps;
  textStyle?: TextProps;
}

const ChartLegend = ({
  chartLegendItems,
  containerStyle,
  textStyle,
}: ChartLegendProps) => {
  return (
    <Stack spacing="16px" direction="row" {...containerStyle}>
      {chartLegendItems.map((item, index) => (
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
            <Text color="neutral.600" fontWeight={700} {...textStyle}>
              {item.label}
            </Text>
            {item.children}
          </VStack>
        </HStack>
      ))}
    </Stack>
  );
};

export default ChartLegend;

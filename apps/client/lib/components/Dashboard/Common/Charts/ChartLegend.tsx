import {
  Box,
  FlexProps,
  HStack,
  Skeleton,
  Stack,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface ChartLegendProps {
  isLoading?: boolean;
  chartLegendItems: {
    label: string;
    color: string;
    children?: React.ReactNode;
  }[];
  containerStyle?: StackProps;
  textStyle?: TextProps;
  boxStyle?: FlexProps;
  textChildrenStyle?: StackProps;
}

const ChartLegend = ({
  chartLegendItems,
  containerStyle,
  boxStyle,
  textStyle,
  isLoading,
  textChildrenStyle,
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
            {...boxStyle}
          />
          <Stack
            alignItems="flex-start"
            spacing="4px"
            m={0}
            p={0}
            direction="column"
            {...textChildrenStyle}
          >
            <Text color="neutral.600" fontWeight={700} {...textStyle}>
              {item.label}
            </Text>
            <Skeleton isLoaded={!isLoading}>{item.children}</Skeleton>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
};

export default ChartLegend;

import { Skeleton, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import React from 'react';

interface DetailProps {
  labelStyle?: TextProps;
  valueStyle?: TextProps;
  itemContainerStyle?: StackProps;
  labelMinWidth?: string | object;
  label: string;
  value?: string | number | React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
}
const Detail = (props: DetailProps) => {
  const {
    labelStyle,
    valueStyle,
    itemContainerStyle,
    labelMinWidth,
    label,
    value,
    children,
    isLoading,
  } = props;
  return (
    <Stack
      spacing="8px"
      alignItems="flex-start"
      direction="row"
      {...itemContainerStyle}
    >
      <Text
        size={{ base: 'base', md: 'md' }}
        minW={labelMinWidth}
        color="neutral.600"
        {...labelStyle}
      >
        {label}
      </Text>
      {children ? (
        children
      ) : (
        <Skeleton isLoaded={!isLoading}>
          <Text size={{ base: 'base', md: 'md' }} {...valueStyle}>
            {isEmpty(value) ? 'N/A' : value}
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default Detail;

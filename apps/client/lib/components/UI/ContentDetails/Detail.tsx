import { Skeleton, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
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
  const isValueEmpty = (value: any) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
  };
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
            {isValueEmpty(value) ? 'N/A' : value}
          </Text>
        </Skeleton>
      )}
    </Stack>
  );
};

export default Detail;

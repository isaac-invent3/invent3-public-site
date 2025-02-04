import { Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import React from 'react';

interface DetailProps {
  labelStyle?: TextProps;
  valueStyle?: TextProps;
  itemContainerStyle?: StackProps;
  labelMinWidth: string;
  label: string;
  value?: string | number | React.ReactNode;
  children?: React.ReactNode;
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
  } = props;
  return (
    <Stack
      spacing="8px"
      alignItems="flex-start"
      direction="row"
      {...itemContainerStyle}
    >
      <Text size="md" minW={labelMinWidth} color="neutral.600" {...labelStyle}>
        {label}
      </Text>
      {children ? (
        children
      ) : (
        <Text size="md" {...valueStyle}>
          {isEmpty(value) ? 'N/A' : value}
        </Text>
      )}
    </Stack>
  );
};

export default Detail;

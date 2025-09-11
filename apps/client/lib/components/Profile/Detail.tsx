import {
  Skeleton,
  StackProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

interface DetailProps extends StackProps {
  label: string;
  value: string | number | undefined | null;
  isLoading?: boolean;
  labelStyle?: TextProps;
  valueStyle?: TextProps;
}
const Detail = ({
  label,
  value,
  isLoading,
  labelStyle,
  valueStyle,
  ...rest
}: DetailProps) => {
  return (
    <VStack alignItems="flex-start" spacing="8px" {...rest}>
      <Text color="neutral.600" whiteSpace="nowrap" {...labelStyle}>
        {label}
      </Text>
      {isLoading && <Skeleton width="50px" height="15px" />}
      {!isLoading && (
        <Text color="black" size="md" {...valueStyle}>
          {value ?? 'N/A'}
        </Text>
      )}
    </VStack>
  );
};

export default Detail;

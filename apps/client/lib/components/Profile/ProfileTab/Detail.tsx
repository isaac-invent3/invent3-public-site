import { Skeleton, StackProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface DetailProps extends StackProps {
  label: string;
  value: string | undefined | null;
  isLoading?: boolean;
}
const Detail = ({ label, value, isLoading, ...rest }: DetailProps) => {
  return (
    <VStack alignItems="flex-start" spacing="8px" {...rest}>
      <Text color="neutral.600">{label}</Text>
      {isLoading && <Skeleton width="50px" height="15px" />}
      {!isLoading && (
        <Text color="black" size="md">
          {value ?? 'N/A'}
        </Text>
      )}
    </VStack>
  );
};

export default Detail;

import { VStack, Text as ChakraText, Icon } from '@chakra-ui/react';
import React from 'react';

interface EmptyStateProps {
  emptyText?: string;
}
const EmptyState = ({ emptyText }: EmptyStateProps) => {
  return (
    <VStack width="full" my="20vh">
      <ChakraText color="neutral.600" size="md">
        {emptyText ?? 'No Data Found'}
      </ChakraText>
    </VStack>
  );
};

export default EmptyState;

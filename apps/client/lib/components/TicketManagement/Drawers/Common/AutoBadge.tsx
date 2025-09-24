import { Text } from '@chakra-ui/react';
import React from 'react';

const AutoBadge = ({ children }: { children?: string }) => {
  return (
    <Text
      color="white"
      bgColor="neutral.800"
      py="4px"
      px="7px"
      rounded="16px"
      flexShrink={0}
    >
      {children ?? 'Auto-generated'}
    </Text>
  );
};

export default AutoBadge;

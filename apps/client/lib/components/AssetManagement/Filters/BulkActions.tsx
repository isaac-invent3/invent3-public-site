import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

const BulkActions = () => {
  return (
    <HStack spacing="7px">
      <Button
        minH="36px"
        bgColor="white"
        color="neutral.800"
        fontSize="12px"
        lineHeight="14.26px"
        fontWeight={700}
        pl="12px"
        pr="8px"
      >
        Transfer Assets
      </Button>
      <Button
        minH="36px"
        bgColor="white"
        color="neutral.800"
        fontSize="12px"
        lineHeight="14.26px"
        fontWeight={700}
        pl="12px"
        pr="8px"
      >
        Dispose Assets
      </Button>
    </HStack>
  );
};

export default BulkActions;

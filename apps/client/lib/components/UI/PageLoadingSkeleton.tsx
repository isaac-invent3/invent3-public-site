import { Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';

const PageLoadingSkeleton = () => {
  return (
    <Flex width="full" px={{ base: '16px', md: 0 }}>
      <Skeleton width="full" rounded="8px" height="250px" />
    </Flex>
  );
};

export default PageLoadingSkeleton;

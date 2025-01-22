import { HStack, Skeleton, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';

interface LoadingSkeletonProps {
  numberOfSkeleton: number;
}
const LoadingSkeleton = ({ numberOfSkeleton = 5 }: LoadingSkeletonProps) => {
  return (
    <VStack
      width="full"
      spacing="8px"
      divider={<StackDivider borderColor="neutral.200" borderWidth="1px" />}
    >
      {Array(numberOfSkeleton)
        .fill('')
        .map((_, index) => (
          <HStack width="full" justifyContent="space-between" key={index}>
            <Skeleton height="20px" width="20%" />
            <Skeleton height="20px" width="50px" />
            <Skeleton height="20px" width="30%" />
          </HStack>
        ))}
    </VStack>
  );
};

export default LoadingSkeleton;

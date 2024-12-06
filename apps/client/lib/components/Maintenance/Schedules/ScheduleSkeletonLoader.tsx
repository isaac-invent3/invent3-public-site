import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';

interface ScheduleSkeletonLoaderProps {
  numberOfSkeleton?: number;
}
const ScheduleSkeletonLoader = (props: ScheduleSkeletonLoaderProps) => {
  const { numberOfSkeleton } = props;
  return (
    <VStack
      my={{ base: '8px', lg: '16px' }}
      width="full"
      justifyContent="center"
      spacing="16px"
    >
      {' '}
      {Array(numberOfSkeleton ?? 3)
        .fill('')
        .map((_, index) => (
          <Skeleton width="full" rounded="8px" key={index} height="97px" />
        ))}
    </VStack>
  );
};

export default ScheduleSkeletonLoader;

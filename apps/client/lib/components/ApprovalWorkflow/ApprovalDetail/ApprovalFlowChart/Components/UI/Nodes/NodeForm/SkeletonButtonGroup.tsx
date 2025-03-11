import { Skeleton } from '@chakra-ui/react';

const SkeletonButtonGroup = ({ count = 4 }: { count?: number }) => {
  return Array.from({ length: count }).map((_, index) => (
    <Skeleton key={index} height="52px" width="full" borderRadius="md" />
  ));
};

export default SkeletonButtonGroup;

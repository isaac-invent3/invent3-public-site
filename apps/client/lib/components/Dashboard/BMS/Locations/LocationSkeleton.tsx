import { Skeleton, Stack, StackProps } from '@chakra-ui/react';
import React from 'react';

interface LocationSkeletonProps {
  numberOfSkeleton: number;
  customStyles?: StackProps;
}
const LocationSkeleton = (props: LocationSkeletonProps) => {
  const { numberOfSkeleton, customStyles } = props;
  return (
    <Stack width="full" overflowX="scroll" spacing="16px" {...customStyles}>
      {Array(numberOfSkeleton)
        .fill('')
        .map((_, index) => (
          <Skeleton minW="206px" height="175px" rounded="8px" key={index} />
        ))}
    </Stack>
  );
};

export default LocationSkeleton;

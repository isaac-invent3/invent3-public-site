import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const Notification = () => {
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      pb="10.67px"
      borderColor="#BBBBBB"
      borderBottomWidth="0.67px"
      alignItems="flex-start"
    >
      <HStack spacing="10.67px" alignItems="flex-start" width="70%">
        <SkeletonCircle width="26.67px" height="26.67px" flexShrink={0} />
        <SkeletonText
          noOfLines={2}
          spacing="4px"
          skeletonHeight="5px"
          width="full"
          mt="4px"
        />
      </HStack>
      <Skeleton width="20%" height="5px" mt="4px" />
    </HStack>
  );
};

interface NotifcationSkeletionProps {
  noOfskeleton?: number;
}
const NotifcationSkeletion = (props: NotifcationSkeletionProps) => {
  const { noOfskeleton = 4 } = props;

  return (
    <VStack width="full" alignItems="flex-start">
      {Array(noOfskeleton)
        .fill('')
        .map((_, index) => (
          <Notification key={index} />
        ))}
    </VStack>
  );
};

export default NotifcationSkeletion;

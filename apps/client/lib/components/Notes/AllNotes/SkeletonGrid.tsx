import { Grid, HStack, Skeleton } from "@chakra-ui/react";

interface SkeletonGridProps {
  count: number;
  columns?: number;
}

const SkeletonGrid = ({ count, columns = 6 }: SkeletonGridProps) => (
  <HStack
    flexWrap="wrap"
    gap="16px"
    w="full"
    justifyContent={{ base: 'space-evenly', md: 'unset' }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        isLoaded={false}
        rounded="8px"
        p="8px"
        h={{ base: '150px', md: '180px' }}
        w={{ base: '120px', md: '150px' }}
      />
    ))}
  </HStack>
);


export default SkeletonGrid;
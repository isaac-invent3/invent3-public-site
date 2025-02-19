import { Grid, Skeleton } from "@chakra-ui/react";

interface SkeletonGridProps {
  count: number;
  columns?: number;
}

const SkeletonGrid = ({ count, columns = 6 }: SkeletonGridProps) => (
  <Grid templateColumns={`repeat(${columns}, 1fr)`} gap="16px" w="full">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} isLoaded={false} rounded="8px" p="8px" h="180px" />
    ))}
  </Grid>
);


export default SkeletonGrid;
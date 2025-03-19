import { HStack, Skeleton, VStack } from '@chakra-ui/react';

interface SkeletonCommentProps {
  count: number;
}

const SkeletonComment = ({ count = 6 }: SkeletonCommentProps) => (
  <VStack spacing="24px" align="start" w="full">
    {Array.from({ length: count }).map((_, index) => (
      <HStack align="start" spacing="8px" w="full">
        <Skeleton
          key={index}
          isLoaded={false}
          rounded="full"
          p="8px"
          width="30px"
          height="28px"
        />

        <VStack align="start" spacing="11.5px" mt="5px" w="full">
          <HStack spacing={2} w="full">
            <Skeleton
              isLoaded={false}
              rounded="8px"
              h="10px"
              w="50px"
              color="neutral.800"
            />

            <Skeleton
              isLoaded={false}
              rounded="8px"
              h="8px"
              w="60px"
              color="neutral.600"
            />
          </HStack>

          <Skeleton
            isLoaded={false}
            rounded="8px"
            h="40px"
            w="full"
            color="neutral.600"
          />
        </VStack>
      </HStack>
    ))}
  </VStack>
);

export default SkeletonComment;

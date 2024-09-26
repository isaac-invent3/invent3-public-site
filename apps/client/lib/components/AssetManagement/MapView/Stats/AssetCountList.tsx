import { Heading, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface AssetCountListProps {
  type: 'state' | 'lga';
  isLoading: boolean;
  data: Record<string, number>;
}

const AssetCountList = (props: AssetCountListProps) => {
  const { type, isLoading, data } = props;
  return (
    <VStack width="full" spacing="8px" alignItems="flex-start">
      <Heading
        color="primary.main"
        fontWeight={700}
        fontSize="16px"
        lineHeight="19.01px"
      >
        Assets by {type ? 'State' : 'LGA'}
      </Heading>
      <VStack width="full" spacing="8px" maxH="50vh" overflow="auto">
        {isLoading
          ? Array(10)
              .fill('')
              .map((_, idx) => (
                <HStack width="full" justifyContent="space-between" key={idx}>
                  <Skeleton width="40%" height="15px" />
                  <Skeleton width="20%" height="15px" />
                </HStack>
              ))
          : Object.entries(data).map(([label, value], index) => (
              <HStack width="full" key={index} justifyContent="space-between">
                <Text color="neutral.600">{label}</Text>
                <Text color="black" fontWeight={800}>
                  {value.toLocaleString()}
                </Text>
              </HStack>
            ))}
      </VStack>
    </VStack>
  );
};

export default AssetCountList;

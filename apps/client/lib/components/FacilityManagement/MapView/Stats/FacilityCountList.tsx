import { Heading, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { SingleMapFacilityData } from '~/lib/interfaces/location.interfaces';

interface FacilityCountListProps {
  type: 'state' | 'lga';
  isLoading: boolean;
  data: Record<string, SingleMapFacilityData>;
}

const FacilityCountList = (props: FacilityCountListProps) => {
  const { type, isLoading, data } = props;
  return (
    <VStack width="full" spacing="8px" alignItems="flex-start">
      <Heading color="primary.500" size="md">
        Facilities by {type === 'state' ? 'Regions' : 'LGA'}
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
          : Object.entries(data).map(([label, option], index) => {
              return (
                <HStack width="full" key={index} justifyContent="space-between">
                  <Text color="neutral.600" size="md">
                    {label}
                  </Text>
                  <Text color="black" fontWeight={800} size="md">
                    {option.count?.toLocaleString()}
                  </Text>
                </HStack>
              );
            })}
      </VStack>
    </VStack>
  );
};

export default FacilityCountList;

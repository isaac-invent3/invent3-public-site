import {
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import { ForecastInfo } from '~/lib/interfaces/forecast.interfaces';

const RecommendedAction = ({
  suggestions,
  isLoading,
}: {
  suggestions?: ForecastInfo[];
  isLoading: boolean;
}) => {
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <Text color="neutral.600" fontWeight={700}>
        Recommended Actions
      </Text>
      {isLoading && <Skeleton width="full" height="100px" />}
      {!isLoading && suggestions && suggestions?.length > 0 && (
        <UnorderedList
          spacing="8px"
          width="full"
          alignItems="flex-start"
          pl="8px"
        >
          {suggestions?.map((item, index) => (
            <ListItem
              key={index}
              color="neutral.700"
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
            >
              {item?.suggestion}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!isLoading && (!suggestions || suggestions?.length === 0) && (
        <EmptyState />
      )}
    </VStack>
  );
};

export default RecommendedAction;

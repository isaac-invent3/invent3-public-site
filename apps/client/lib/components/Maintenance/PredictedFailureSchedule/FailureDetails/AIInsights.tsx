import { ListItem, Skeleton, UnorderedList, VStack } from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';

const AIInsights = () => {
  const isLoading = false;
  const isFetching = false;

  const items = [
    '3 high-risk assets have overlapping maintenance schedules.',
    'Scheduling Pump-04 earlier could reduce predicted downtime by 8%.',
    'Overall maintenance load for October is 14% higher than the monthly average.',
  ];
  return (
    <VStack
      width="full"
      px={4}
      py={6}
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
      minH="281px"
    >
      <CardHeader>AI Insights</CardHeader>
      {(isLoading || isFetching) && <Skeleton width="full" height="100px" />}
      {!isLoading && !isFetching && items?.length > 0 && (
        <UnorderedList
          spacing="16px"
          width="full"
          alignItems="flex-start"
          pl="8px"
        >
          {items?.map((item, index) => (
            <ListItem
              key={index}
              color="neutral.600"
              fontSize="14px"
              fontWeight={700}
              lineHeight="100%"
            >
              {item}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!isLoading && !isFetching && items?.length === 0 && <EmptyState />}
    </VStack>
  );
};

export default AIInsights;

import { ListItem, Skeleton, UnorderedList, VStack } from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import { LifeCycleFilter } from '~/lib/interfaces/location/lifecycle.interfaces';
import { useGetLifeCycleComparisonReportInsightsQuery } from '~/lib/redux/services/location/lifecycleComparison.services';

const InsightsPanel = ({ filters }: { filters: LifeCycleFilter }) => {
  const { data, isLoading, isFetching } =
    useGetLifeCycleComparisonReportInsightsQuery({
      ...filters,
    });
  return (
    <VStack
      width="full"
      height="full"
      minH="300px"
      p="16px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Insights Panel</CardHeader>
      {isLoading || (isFetching && <Skeleton width="full" height="50px" />)}
      {!isLoading && !isFetching && data?.data && data?.data?.length == 0 && (
        <EmptyState
          emptyText="No Insight at the moment"
          containerStyle={{ my: 8 }}
        />
      )}
      <UnorderedList
        spacing="16px"
        width="full"
        alignItems="flex-start"
        pl="8px"
      >
        {!isLoading &&
          !isFetching &&
          data?.data &&
          data?.data?.length > 0 &&
          data?.data?.map((item, index) => (
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
    </VStack>
  );
};

export default InsightsPanel;

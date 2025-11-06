import { ListItem, Skeleton, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';
import { EmptyState } from '@repo/ui/components';
import { useGetPredictiveMaintenanceDashboardAiHighlightsQuery } from '~/lib/redux/services/dashboard/predictivemaintenance.services';
import { useAppSelector } from '~/lib/redux/hooks';

const AIHighlights = () => {
  const filters = useAppSelector((state) => state.common.filters);
  const { data, isLoading, isFetching } =
    useGetPredictiveMaintenanceDashboardAiHighlightsQuery({
      facilityIds: filters?.facilities,
      assetCategoryIds: filters?.assetCategories,
      datePeriod: filters?.datePeriod?.[0],
      riskThreshold: filters?.datePeriod?.[0],
    });

  return (
    <VStack
      width="full"
      height="full"
      p="20px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>AI Highlights</CardHeader>
      {(isLoading || isFetching) && <Skeleton width="full" height="100px" />}
      {!isLoading && !isFetching && data && data?.data?.length > 0 && (
        <UnorderedList
          spacing="16px"
          width="full"
          alignItems="flex-start"
          pl="8px"
        >
          {data?.data?.map((item, index) => (
            <ListItem
              key={index}
              color="neutral.600"
              fontSize="14px"
              fontWeight={700}
              lineHeight="100%"
            >
              {item?.insight}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!isLoading && !isFetching && (!data || data?.data?.length === 0) && (
        <EmptyState />
      )}
    </VStack>
  );
};

export default AIHighlights;

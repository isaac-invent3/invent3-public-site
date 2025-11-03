import { Skeleton, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAssetFailureInsightsQuery } from '~/lib/redux/services/forecast.services';

const InsightRecommendations = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { data, isLoading } = useGetAssetFailureInsightsQuery({
    assetId: assetData?.assetId,
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <Text size="md" color="neutral.600" p={4}>
        {data?.data?.insight} {data?.data?.suggestion}
      </Text>
    </Skeleton>
  );
};

export default InsightRecommendations;

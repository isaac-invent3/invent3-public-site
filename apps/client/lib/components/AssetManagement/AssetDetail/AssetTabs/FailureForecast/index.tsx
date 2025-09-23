import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Forecast from './Forecast';
import DriversAffectingPrediction from './DriversAffectingPrediction';
import VisualTimeline from './VisualTimeline';
import { useAppSelector } from '~/lib/redux/hooks';
import { FORECAST_TYPE_ENUM } from '~/lib/utils/constants';
import { useGetAssetForecastQuery } from '~/lib/redux/services/forecast.services';

const FailureForecast = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;
  const { data, isLoading } = useGetAssetForecastQuery({
    assetId,
    forecastType: FORECAST_TYPE_ENUM.FAILURE,
  });

  return (
    <VStack
      width="full"
      spacing={{ base: '16px', md: '32px' }}
      my="24px"
      bgColor="white"
      p={{ base: '16px' }}
      rounded="8px"
    >
      <SimpleGrid width="full" spacing="40px" columns={{ base: 1, lg: 2 }}>
        <Forecast isLoading={isLoading} data={data?.data} />
        <DriversAffectingPrediction isLoading={isLoading} data={data?.data} />
      </SimpleGrid>
      <VisualTimeline isLoading={isLoading} data={data?.data} />
    </VStack>
  );
};

export default FailureForecast;

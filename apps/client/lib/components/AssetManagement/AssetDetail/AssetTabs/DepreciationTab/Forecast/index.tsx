import { VStack } from '@chakra-ui/react';
import React from 'react';
import ReplacementForecast from './ReplacementForecast';
import KeyDrivers from './KeyDrivers';
import { useGetAssetForecastQuery } from '~/lib/redux/services/forecast.services';
import { useAppSelector } from '~/lib/redux/hooks';
import { FORECAST_TYPE_ENUM } from '~/lib/utils/constants';

const Forecast = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;
  const { data, isLoading } = useGetAssetForecastQuery({
    assetId,
    forecastType: FORECAST_TYPE_ENUM.REPLACEMENT,
  });

  return (
    <VStack width={{ base: 'full', lg: '40%' }} spacing="24px">
      <ReplacementForecast isLoading={isLoading} data={data?.data} />
      <KeyDrivers isLoading={isLoading} data={data?.data} />
    </VStack>
  );
};

export default Forecast;

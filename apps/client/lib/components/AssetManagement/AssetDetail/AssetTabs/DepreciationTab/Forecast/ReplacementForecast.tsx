import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface ReplacementForecastProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const ReplacementForecast = (props: ReplacementForecastProps) => {
  const { data, isLoading } = props;

  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <DetailHeader variant="secondary">Replacement Forecast</DetailHeader>
      <Text color="neutral.600" fontSize="12px" lineHeight="130%">
        Expected Replacement:
      </Text>
      {isLoading ? (
        <Skeleton width="full" height="100px" />
      ) : (
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <HStack spacing="16px">
            <Text size="lg" lineHeight="130%" color="neutral.800">
              {data?.dateForcasted
                ? moment(data?.dateForcasted).format('[Q]Q YYYY')
                : 'N/A'}
            </Text>
            {data?.confidenceLevelName && (
              <GenericStatusBox
                showDot={false}
                text={data?.confidenceLevelName!}
                colorCode={data?.confidenceLevelColor}
                rounded="full"
              />
            )}
          </HStack>
          <Text color="neutral.800">
            {data?.forecastDrivers
              ? data?.forecastDrivers
                  ?.map((item) => item.driverFeature)
                  .join(', ')
              : 'N/A'}
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default ReplacementForecast;

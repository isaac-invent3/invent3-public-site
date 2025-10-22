import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

interface ForecastProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const Forecast = (props: ForecastProps) => {
  const { data, isLoading } = props;
  const today = moment();
  const start = moment(data?.forecastedLabelStartDate);
  const end = moment(data?.forcastedLabelEndDate);
  const diffStartDays = start.diff(today, 'days');
  const diffEndDays = today.diff(end, 'days');
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <DetailHeader variant="secondary">Failure Forecast</DetailHeader>
      <Text color="neutral.600" fontSize="12px" lineHeight="130%">
        Expected Failure:
      </Text>
      {isLoading ? (
        <Skeleton width="full" height="100px" />
      ) : (
        <VStack width="full" spacing="16px" alignItems="flex-start">
          <VStack width="full" alignItems="flex-start" spacing="5px">
            <HStack spacing="12px">
              <Text fontSize="24px" lineHeight="130%" color="neutral.800">
                {data?.forecastedLabelStartDate
                  ? `${diffStartDays} days`
                  : 'N/A'}
              </Text>
              <GenericStatusBox
                showDot={false}
                text={data?.confidenceLevelName!}
                colorCode={data?.confidenceLevelColor}
                useColorCodeAsTextColor
                rounded="full"
              />
            </HStack>
            <Text color="neutral.800">
              Forecast updated daily using predictive model.
            </Text>
          </VStack>
          {data && <Text color="blue.500">Schedule Preventive Task</Text>}
        </VStack>
      )}
    </VStack>
  );
};

export default Forecast;

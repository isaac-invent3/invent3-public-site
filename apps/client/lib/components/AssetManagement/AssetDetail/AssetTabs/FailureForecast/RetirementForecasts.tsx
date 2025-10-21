import {
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Detail from '~/lib/components/UI/ContentDetails/Detail';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

interface RetirementForecastsProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const RetirementForecasts = (props: RetirementForecastsProps) => {
  const { data, isLoading } = props;

  return (
    <VStack width="full" spacing="12px" alignItems="flex-start">
      {isLoading && <Skeleton width="full" height="100px" />}
      {!isLoading && data && data?.forecastDrivers?.length > 0 && (
        <VStack width="full" spacing="12px" alignItems="flex-start">
          <UnorderedList
            spacing="8px"
            width="full"
            alignItems="flex-start"
            pl="8px"
          >
            {data?.forecastDrivers?.map((item, index) => (
              <ListItem
                key={index}
                color="black"
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
              >
                <Detail
                  label={item?.driverFeature!}
                  value={item?.description}
                  labelMinWidth="90px"
                  labelStyle={{ color: 'black' }}
                />
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
      )}
      {!isLoading &&
        (data?.forecastDrivers?.length === 0 || !data?.forecastDrivers) && (
          <Text
            fontStyle="italic"
            color="neutral.300"
            width="full"
            textAlign="center"
            size="md"
            my={8}
          >
            No Data at the moment
          </Text>
        )}
    </VStack>
  );
};

export default RetirementForecasts;

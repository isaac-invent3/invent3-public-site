import {
  ListItem,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';

interface KeyDriversProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const KeyDrivers = (props: KeyDriversProps) => {
  const { data, isLoading } = props;

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <Text color="neutral.600" size="md">
        Key Drivers:
      </Text>
      {isLoading && <Skeleton width="full" height="100px" />}
      {!isLoading && data && data?.forecastDrivers.length > 0 && (
        <UnorderedList
          spacing="8px"
          width="full"
          alignItems="flex-start"
          pl="8px"
        >
          {data?.forecastDrivers.map((item, index) => (
            <ListItem
              key={index}
              color="black"
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
            >
              {item?.driverFeature}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!isLoading && (data?.forecastDrivers.length === 0 || !data) && (
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

export default KeyDrivers;

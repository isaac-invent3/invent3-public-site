import {
  Box,
  HStack,
  Icon,
  ListItem,
  Skeleton,
  Text,
  Tooltip,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { EmptyState } from '@repo/ui/components';
import React from 'react';
import { InfoIcon } from '~/lib/components/CustomIcons';
import { ForecastInfo } from '~/lib/interfaces/forecast.interfaces';

const FailureDrivers = ({
  drivers,
  isLoading,
}: {
  drivers?: ForecastInfo[];
  isLoading: boolean;
}) => {
  return (
    <VStack spacing="16px" width="full" alignItems="flex-start">
      <HStack spacing="16px">
        <Text color="neutral.600" fontWeight={700}>
          Failure Drivers
        </Text>
        <Tooltip
          label="Drivers are the top factors influencing this prediction."
          placement="top"
          bgColor="black"
          color="white"
          minW="219px"
          rounded="10px"
          padding="6px"
          fontSize="12px"
        >
          <HStack
            width="12px"
            height="12px"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={InfoIcon} boxSize="12px" color="blue.500" />
          </HStack>
        </Tooltip>
      </HStack>
      {isLoading && <Skeleton width="full" height="100px" />}
      {!isLoading && drivers && drivers?.length > 0 && (
        <UnorderedList
          spacing="8px"
          width="full"
          alignItems="flex-start"
          pl="8px"
        >
          {drivers?.map((item, index) => (
            <ListItem
              key={index}
              color="neutral.700"
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
            >
              {item.description}
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {!isLoading && (!drivers || drivers?.length === 0) && <EmptyState />}
    </VStack>
  );
};

export default FailureDrivers;

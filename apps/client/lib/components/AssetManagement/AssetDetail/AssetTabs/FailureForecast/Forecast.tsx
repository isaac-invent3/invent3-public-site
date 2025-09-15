import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

const Forecast = () => {
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <DetailHeader variant="secondary">Failure Forecast</DetailHeader>
      <Text color="neutral.600" fontSize="12px" lineHeight="130%">
        Expected Failure:
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="5px">
        <HStack spacing="12px">
          <Text fontSize="24px" lineHeight="130%" color="neutral.800">
            10 - 15 Days
          </Text>
          <GenericStatusBox
            showDot={false}
            text="Medium Confidence"
            colorCode="#B88B02"
            useColorCodeAsTextColor
            rounded="full"
          />
        </HStack>
        <Text color="neutral.800">
          Forecast updated daily using predictive model.
        </Text>
      </VStack>
      <Text color="blue.500">Schedule Preventive Task</Text>
    </VStack>
  );
};

export default Forecast;

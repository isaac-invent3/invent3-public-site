import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';

const ReplacementForecast = () => {
  return (
    <VStack width="full" spacing="16px" alignItems="flex-start">
      <DetailHeader variant="secondary">Replacement Forecast</DetailHeader>
      <Text color="neutral.600" fontSize="12px" lineHeight="130%">
        Expected Replacement:
      </Text>
      <VStack width="full" alignItems="flex-start" spacing="8px">
        <HStack spacing="16px">
          <Text size="lg" lineHeight="130%" color="neutral.800">
            Q3 2028
          </Text>
          <GenericStatusBox
            showDot={false}
            text="High Confidence"
            color="#00A129"
            rounded="full"
          />
        </HStack>
        <Text color="neutral.800">
          Based on age, health, and lifecycle trends
        </Text>
      </VStack>
    </VStack>
  );
};

export default ReplacementForecast;

import React from 'react';
import AIContainer from '../../../Common/AIContainer';
import { Text, VStack } from '@chakra-ui/react';

const OptimisationRecommendation = () => {
  return (
    <AIContainer title="Optimisation Recommendation">
      <VStack bgColor="white" spacing="8px" alignItems="flex-start" mt="71px">
        <Text fontWeight={400}>
          <Text fontWeight={800} fontSize="20px" as="span">
            Reduce HVAC usage
          </Text>{' '}
          in low-occupancy areas.
        </Text>
        <Text color="neutral.600" size="md">
          Low occupancy areas like Zone D.
        </Text>
      </VStack>
    </AIContainer>
  );
};

export default OptimisationRecommendation;

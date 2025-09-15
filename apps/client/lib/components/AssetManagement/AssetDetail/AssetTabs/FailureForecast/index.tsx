import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Forecast from './Forecast';
import DriversAffectingPrediction from './DriversAffectingPrediction';
import VisualTimeline from './VisualTimeline';

const FailureForecast = () => {
  return (
    <VStack
      width="full"
      spacing={{ base: '16px', md: '32px' }}
      my="24px"
      bgColor="white"
      p={{ base: '8px', lg: '16px' }}
      rounded="8px"
    >
      <SimpleGrid width="full" spacing="40px" columns={{ base: 1, lg: 2 }}>
        <Forecast />
        <DriversAffectingPrediction />
      </SimpleGrid>
      <VisualTimeline />
    </VStack>
  );
};

export default FailureForecast;

import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import PredictedTaskVolume from './PredictedTaskVolume';
import UpcomingPredictedFailures from './UpcomingPredictedFailures';

const Predictions = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, lg: 2 }}
      gap="48px"
      px="16px"
      py="32px"
    >
      <PredictedTaskVolume />
      <UpcomingPredictedFailures />
    </SimpleGrid>
  );
};

export default Predictions;

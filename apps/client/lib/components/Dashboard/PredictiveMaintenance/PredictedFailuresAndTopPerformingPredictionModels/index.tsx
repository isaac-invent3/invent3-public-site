import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TopPerformingPredictionModels from './TopPerformingPredictionModels';
import PredictedFailuresByAssetCategory from './PredictedFailuresByAssetCategory';

const PredictedFailuresAndTopPerformingPredictionModels = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <PredictedFailuresByAssetCategory />
      <TopPerformingPredictionModels />
    </SimpleGrid>
  );
};

export default PredictedFailuresAndTopPerformingPredictionModels;

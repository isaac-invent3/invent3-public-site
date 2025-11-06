import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import ModelAccuracyOverTime from './ModelAccuracyOverTime';
import AIHighlights from './AIHighlights';

const ModelAccurracyAndAIHighlights = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <ModelAccuracyOverTime />
      <AIHighlights />
    </SimpleGrid>
  );
};

export default ModelAccurracyAndAIHighlights;

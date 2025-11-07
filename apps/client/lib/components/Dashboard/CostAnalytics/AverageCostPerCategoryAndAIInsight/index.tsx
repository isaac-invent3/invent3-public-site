import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import AIInsights from './AIInsights';
import AverageCostPerCategory from './AverageCostPerCategory';

const AverageCostPerCategoryAndAIInsight = () => {
  return (
    <SimpleGrid width="full" spacing="14px" columns={{ base: 1, lg: 2 }}>
      <AverageCostPerCategory />
      <AIInsights />
    </SimpleGrid>
  );
};

export default AverageCostPerCategoryAndAIInsight;

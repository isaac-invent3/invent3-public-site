import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import Summary from './Summary';
import CostBreakdownBySystems from './CostBreakdownBySystems';
import EnergyCost from './EnergyCost';

const FinancialInsight = () => {
  return (
    <VStack width="full" p="16px" spacing="16px">
      <Summary />
      <SimpleGrid
        width="full"
        columns={{ base: 1, lg: 2 }}
        gap="16px"
        minH="368px"
      >
        <CostBreakdownBySystems />
        <EnergyCost />
      </SimpleGrid>
    </VStack>
  );
};

export default FinancialInsight;

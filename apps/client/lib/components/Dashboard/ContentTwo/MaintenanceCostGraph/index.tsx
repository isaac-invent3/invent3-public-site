import { VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '../../Common/CardHeader';

const MaintenanceCostGraph = () => {
  return (
    <VStack
      width="full"
      height="full"
      p="16px 19px 19px 16px"
      alignItems="flex-start"
      spacing="24px"
      bgColor="white"
      rounded="8px"
    >
      <CardHeader>Total Maintenance Cost</CardHeader>
    </VStack>
  );
};

export default MaintenanceCostGraph;

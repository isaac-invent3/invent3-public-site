import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import PlanList from '../../MaintenancePlanStep/PlanList';

const SectionFour = () => {
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start" overflow="auto">
      <DetailHeader variant="primary">Maintenance Plan</DetailHeader>
      <PlanList viewOnly showEmptyState />
    </VStack>
  );
};

export default SectionFour;

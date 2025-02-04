import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import MaintenanceBudgetReport from './MaintenanceBudgetReport';
import TicketResolutionPerformance from './TicketResolutionPerformance';

const SectionFour = () => {
  return (
    <SimpleGrid width="full" gap="16px" columns={2}>
      <MaintenanceBudgetReport />
      <TicketResolutionPerformance />
    </SimpleGrid>
  );
};

export default SectionFour;

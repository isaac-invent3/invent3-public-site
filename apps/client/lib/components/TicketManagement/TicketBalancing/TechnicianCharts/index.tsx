import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TicketDistributionBySkillGroup from './TicketDistributionBySkillGroup';
import ActiveTasksPerTechnicians from './ActiveTasksPerTechnicians';
import TechnicianLocations from './TechnicianLocations';

const TechnicianCharts = () => {
  return (
    <SimpleGrid
      width="full"
      gap={4}
      height="full"
      columns={{ base: 1, md: 2, lg: 3 }}
    >
      <TicketDistributionBySkillGroup />
      <ActiveTasksPerTechnicians />
      <TechnicianLocations />
    </SimpleGrid>
  );
};

export default TechnicianCharts;

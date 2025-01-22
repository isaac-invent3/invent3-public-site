import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import MaintenanceAndDowntimeChart from './MaintenanceAndDowntime';
import TicketTrend from '../../FrontDesk/SectionTwo/TicketTrend';

const SectionTwo = () => {
  return (
    <SimpleGrid columns={3} width="full" gap="16px">
      <TicketTrend />
      <MaintenanceAndDowntimeChart />
      <TaskCompletionRateChart
        notCompletedColorCode="#00A129"
        completedColorCode="#0366EF"
      />
    </SimpleGrid>
  );
};

export default SectionTwo;

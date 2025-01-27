import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import TaskCompletionRateChart from '../../Common/Charts/TaskCompletionRateChart';
import MaintenanceAndDowntimeChart from './MaintenanceAndDowntime';
import TicketTrend from '../../FrontDesk/SectionTwo/TicketTrend';

const SectionTwo = () => {
  return (
    <SimpleGrid columns={3} width="full" gap="16px">
      <TicketTrend isLoading={false} data={[]} />
      <MaintenanceAndDowntimeChart />
      <TaskCompletionRateChart
        notCompletedColorCode="#00A129"
        completedColorCode="#0366EF"
        isLoading={false}
        data={[]}
      />
    </SimpleGrid>
  );
};

export default SectionTwo;

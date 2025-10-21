import { VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import StackedBarChart from '~/lib/components/Dashboard/Common/Charts/StackedBarChart';
import { useGetActiveTicketsPerTechnicianQuery } from '~/lib/redux/services/ticket.services';

const ActiveTasksPerTechnicians = () => {
  const { data, isLoading } = useGetActiveTicketsPerTechnicianQuery();

  return (
    <VStack
      width="full"
      height="full"
      p={4}
      alignItems="flex-start"
      spacing="34px"
      bgColor="white"
      rounded="8px"
      minH="357px"
    >
      <CardHeader>Active Tasks per Technician</CardHeader>

      <StackedBarChart
        labels={data?.data?.map((item) => item.name) ?? []}
        firstStack={{
          label: 'Budget',
          values: data?.data?.map((item) => item.totalTickets) ?? [],
          color: '#17A1FA',
        }}
        isLoading={isLoading}
        barRadius={32}
      />
    </VStack>
  );
};

export default ActiveTasksPerTechnicians;

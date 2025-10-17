import { VStack } from '@chakra-ui/react';
import React from 'react';
import CardHeader from '~/lib/components/Dashboard/Common/CardHeader';
import StackedBarChart from '~/lib/components/Dashboard/Common/Charts/StackedBarChart';

const ActiveTasksPerTechnicians = () => {
  const data = [
    {
      technician: 'T. Okafor',
      activeTask: 6,
    },
    {
      technician: 'L. Bello',
      activeTask: 4,
    },
    {
      technician: 'R. Adeyemi',
      activeTask: 5,
    },
    {
      technician: 'C. Musa',
      activeTask: 4,
    },
    {
      technician: 'B. Johnson',
      activeTask: 2,
    },
  ];
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
        labels={data?.map((item) => item.technician)}
        firstStack={{
          label: 'Budget',
          values: data?.map((item) => item.activeTask) ?? [],
          color: '#17A1FA',
        }}
        isLoading={false}
        barRadius={32}
      />
    </VStack>
  );
};

export default ActiveTasksPerTechnicians;

import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import TaskTitle from '../../Common/TaskTitle';
import TaskPriority from '../../Common/TaskPriority';
import TaskDescription from '../../Common/TaskDescription';
import DueDate from '../../Common/DueDate';
import TaskAssignedTo from '../../Common/AssignedTo';
import TaskType from '../../Common/TaskType';
import CostEstimate from '../../Common/CostEstimate';

const SectionTwo = () => {
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <TaskTitle sectionMaxWidth="118px" spacing="63px" />
        <TaskType sectionMaxWidth="118px" spacing="40px" />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <TaskDescription sectionMaxWidth="118px" spacing="63px" />

        <TaskPriority sectionMaxWidth="118px" spacing="40px" />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <DueDate sectionMaxWidth="118px" spacing="63px" />
        <CostEstimate sectionMaxWidth="118px" spacing="63px" />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <TaskAssignedTo sectionMaxWidth="118px" spacing="63px" />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;

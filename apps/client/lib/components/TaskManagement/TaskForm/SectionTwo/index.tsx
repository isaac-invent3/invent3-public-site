import { SimpleGrid, VStack } from '@chakra-ui/react';

import TaskPriority from '../../Common/TaskPriority';
import TaskDescription from '../../Common/TaskDescription';
import TaskAssignedTo from '../../Common/AssignedTo';
import TaskType from '../../Common/TaskType';
import CostEstimate from '../../Common/CostEstimate';
import EstimatedDuration from '../../Common/EstimatedDuration';

const SectionTwo = () => {
  return (
    <VStack spacing="45px" width="full" alignItems="flex-start">
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <TaskDescription sectionMaxWidth="141px" spacing="47px" />
        <TaskType sectionMaxWidth="141px" spacing="40px" />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <EstimatedDuration sectionMaxWidth="141px" spacing="47px" />
        <CostEstimate sectionMaxWidth="141px" spacing="47px" />
      </SimpleGrid>
      <SimpleGrid
        columns={2}
        alignItems="flex-start"
        width="full"
        spacing="76px"
      >
        <TaskPriority sectionMaxWidth="141px" spacing="40px" />
        <TaskAssignedTo sectionMaxWidth="141px" spacing="47px" />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;

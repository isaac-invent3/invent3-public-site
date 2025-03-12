import { SimpleGrid, VStack } from '@chakra-ui/react';

import TaskPriority from '../../Common/TaskPriority';
import TaskDescription from '../../Common/TaskDescription';
import TaskAssignedTo from '../../Common/AssignedTo';
import TaskType from '../../Common/TaskType';
import CostEstimate from '../../Common/CostEstimate';
import EstimatedDuration from '../../Common/EstimatedDuration';

const SectionTwo = () => {
  return (
    <VStack
      spacing={{ base: '30px', md: '45px' }}
      width="full"
      alignItems="flex-start"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing={{ base: '30px', md: '78px' }}
      >
        <TaskDescription sectionMaxWidth="141px" spacing="47px" />
        <TaskType sectionMaxWidth="141px" spacing="40px" />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing={{ base: '30px', md: '78px' }}
      >
        <EstimatedDuration sectionMaxWidth="141px" spacing="47px" />
        <CostEstimate sectionMaxWidth="141px" spacing="47px" />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        width="full"
        spacing={{ base: '30px', md: '78px' }}
      >
        <TaskPriority sectionMaxWidth="141px" spacing="40px" />
        <TaskAssignedTo sectionMaxWidth="141px" spacing="47px" />
      </SimpleGrid>
    </VStack>
  );
};

export default SectionTwo;

import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Modals/TaskFormModal';
import AddButton from '~/lib/components/UI/Form/FormAddButton';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';

const Tasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack width="full" alignItems="flex-start" spacing="41px">
      <Flex width="full" maxW="141px">
        <SectionInfo
          title="Tasks"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <HStack mt="20px">
        <AddButton color="#0366EF" handleClick={onOpen}>
          Add Task
        </AddButton>
      </HStack>
      <TaskFormModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default Tasks;

import { Flex, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllTaskPrioritiesQuery,
  useSearchTaskPrioritiesMutation,
} from '~/lib/redux/services/task/priorities.services';

const TaskPriority = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllTaskPrioritiesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchTaskPriorities] = useSearchTaskPrioritiesMutation({});

  return (
    <HStack width="full" alignItems="flex-start" spacing="73px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Priority"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <GenericAsyncSelect
        selectName="priorityId"
        selectTitle="Task Priority"
        data={data}
        labelKey="priority"
        valueKey="taskPriorityId"
        mutationFn={searchTaskPriorities}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </HStack>
  );
};

export default TaskPriority;

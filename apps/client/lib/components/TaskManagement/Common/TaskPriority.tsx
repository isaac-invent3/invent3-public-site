import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllTaskPrioritiesQuery,
  useSearchTaskPrioritiesMutation,
} from '~/lib/redux/services/task/priorities.services';

interface TaskPriorityProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskPriority = (props: TaskPriorityProps) => {
  const { sectionMaxWidth, spacing } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllTaskPrioritiesQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchTaskPriorities] = useSearchTaskPrioritiesMutation({});
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
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
        handleSelect={(option) => setFieldValue('priorityName', option.label)}
        defaultInputValue={values.priorityName}
      />
    </HStack>
  );
};

export default TaskPriority;

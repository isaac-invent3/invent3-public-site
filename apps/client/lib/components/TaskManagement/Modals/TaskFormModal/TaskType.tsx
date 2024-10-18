import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import {
  useGetAllTaskTypeQuery,
  useSearchTaskTypeMutation,
} from '~/lib/redux/services/task/types.services';

const TaskType = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useGetAllTaskTypeQuery({
    pageSize: 25,
    pageNumber,
  });
  const [searchTaskType] = useSearchTaskTypeMutation({});
  const { setFieldValue, values } = useFormikContext<any>();

  return (
    <HStack width="full" alignItems="flex-start" spacing="73px">
      <Flex width="full" maxW="118px">
        <SectionInfo
          title="Type"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <GenericAsyncSelect
        selectName="taskTypeId"
        selectTitle="Task Type"
        data={data}
        labelKey="typeName"
        valueKey="taskTypeId"
        mutationFn={searchTaskType}
        isLoading={isLoading}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        handleSelect={(option) => setFieldValue('taskType', option.label)}
        defaultInputValue={values.taskTypeName}
      />
    </HStack>
  );
};

export default TaskType;

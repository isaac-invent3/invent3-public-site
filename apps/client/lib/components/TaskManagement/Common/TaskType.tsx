import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { useGetAllTaskTypeQuery } from '~/lib/redux/services/task/types.services';
import SelectableButtonGroup from '../../UI/Button/SelectableButtonGroup';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface TaskTypeProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskType = (props: TaskTypeProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { data, isLoading } = useGetAllTaskTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { setFieldValue, values } = useFormikContext<taskFormDetails>();

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Type"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <SelectableButtonGroup
        options={generateOptions(data?.data.items, 'typeName', 'taskTypeId')}
        selectedOptions={[
          {
            value: values.taskTypeId as number,
            label: values.taskType as string,
          },
        ]}
        handleSelect={(options) => {
          setFieldValue('taskTypeId', options[0]?.value);
          setFieldValue('taskType', options[0]?.label);
        }}
        isMultiSelect={false}
        isLoading={isLoading}
        buttonVariant="secondary"
        customButtonStyle={{ width: 'max-content' }}
      />
    </HStack>
  );
};

export default TaskType;

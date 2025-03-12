import { VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import {
  ErrorMessage,
  FormInputWrapper,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useGetAllTaskTypeQuery } from '~/lib/redux/services/task/types.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface TaskTypeProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskType = (props: TaskTypeProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { data, isLoading } = useGetAllTaskTypeQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('taskTypeId');
  const { setFieldValue, values } = useFormikContext<taskFormDetails>();

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Type"
      description="Add the type of this task"
      isRequired
    >
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <SelectableButtonGroup
          options={generateOptions(data?.data.items, 'typeName', 'taskTypeId')}
          selectedOptions={[
            {
              value: values.taskTypeId as number,
              label: values.taskType as string,
            },
          ]}
          handleSelect={(options) => {
            setFieldValue('taskType', options[0]?.label);
            setFieldValue('taskTypeId', options[0]?.value);
          }}
          isMultiSelect={false}
          isLoading={isLoading}
          buttonVariant="secondary"
          customButtonStyle={{ width: 'max-content' }}
        />
        {meta.touched && meta.error !== undefined && (
          <ErrorMessage>{meta.error}</ErrorMessage>
        )}
      </VStack>
    </FormInputWrapper>
  );
};

export default TaskType;

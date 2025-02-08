import { VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import {
  ErrorMessage,
  FormInputWrapper,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { generateOptions } from '~/lib/utils/helperFunctions';

interface TaskPriorityProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskPriority = (props: TaskPriorityProps) => {
  const { sectionMaxWidth, spacing } = props;
  const { data, isLoading } = useGetAllTaskPrioritiesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
  });
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField('priorityId');
  const { setFieldValue, values } = useFormikContext<taskFormDetails>();

  return (
    <FormInputWrapper
      sectionMaxWidth={sectionMaxWidth}
      customSpacing={spacing}
      title="Priority"
      description="Set the urgency level for this task"
      isRequired
    >
      <VStack width="full" spacing="8px" alignItems="flex-start">
        <SelectableButtonGroup
          options={generateOptions(
            data?.data.items,
            'priority',
            'taskPriorityId'
          )}
          selectedOptions={[
            {
              value: values.priorityId as number,
              label: values.priorityName as string,
            },
          ]}
          handleSelect={(options) => {
            setFieldValue('priorityName', options[0]?.label);
            setFieldValue('priorityId', options[0]?.value);
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

export default TaskPriority;

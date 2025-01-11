import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';

import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import {
  ErrorMessage,
  FormSectionInfo,
  SelectableButtonGroup,
} from '@repo/ui/components';
import { generateOptions } from '~/lib/utils/helperFunctions';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';

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
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Priority"
          info="Set the urgency level for this task"
          isRequired
        />
      </Flex>
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
    </HStack>
  );
};

export default TaskPriority;

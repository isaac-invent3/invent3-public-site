import { Flex, HStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { SelectableButtonGroup } from '@repo/ui/components';
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
  const { setFieldValue, values } = useFormikContext<taskFormDetails>();

  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Priority"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
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
          setFieldValue('priorityId', options[0]?.value);
          setFieldValue('priorityName', options[0]?.label);
        }}
        isMultiSelect={false}
        isLoading={isLoading}
        buttonVariant="secondary"
        customButtonStyle={{ width: 'max-content' }}
      />
    </HStack>
  );
};

export default TaskPriority;

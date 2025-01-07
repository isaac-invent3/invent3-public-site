import { Flex, HStack } from '@chakra-ui/react';

import { Field } from 'formik';
import { FormSectionInfo, FormTextInput } from '@repo/ui/components';

interface TaskTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskTitle = (props: TaskTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Task Title"
          info="Enter a clear title for this task"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextInput}
        name="taskName"
        type="text"
        label="Task Title"
      />
    </HStack>
  );
};

export default TaskTitle;

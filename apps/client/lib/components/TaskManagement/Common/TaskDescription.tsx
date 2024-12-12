import { Flex, HStack } from '@chakra-ui/react';

import { Field } from 'formik';
import { FormSectionInfo, FormTextAreaInput } from '@repo/ui/components';

interface TaskDescriptionProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskDescription = (props: TaskDescriptionProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <FormSectionInfo
          title="Description"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={FormTextAreaInput}
        name="taskDescription"
        type="text"
        label="Description"
        placeholder="Description"
        customStyle={{ height: '133px' }}
      />
    </HStack>
  );
};

export default TaskDescription;

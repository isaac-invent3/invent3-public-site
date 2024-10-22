import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextInput from '../../UI/TextInput';

interface TaskTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskTitle = (props: TaskTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Task Title"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field as={TextInput} name="taskName" type="text" label="Task Title" />
    </HStack>
  );
};

export default TaskTitle;

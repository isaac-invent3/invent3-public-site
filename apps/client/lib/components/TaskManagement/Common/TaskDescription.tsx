import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import SectionInfo from '../../UI/Form/FormSectionInfo';
import { Field } from 'formik';
import TextareaInput from '../../UI/TextArea';

interface TaskDescriptionProps {
  sectionMaxWidth: string;
  spacing: string;
}
const TaskDescription = (props: TaskDescriptionProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Description"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextareaInput}
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

import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

interface ScheduleTitleProps {
  sectionMaxWidth: string;
  spacing: string;
}
const ScheduleTitle = (props: ScheduleTitleProps) => {
  const { sectionMaxWidth, spacing } = props;
  return (
    <HStack width="full" alignItems="flex-start" spacing={spacing}>
      <Flex width="full" maxW={sectionMaxWidth}>
        <SectionInfo
          title="Schedule Title"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field as={TextInput} name="name" type="text" label="Schedule Title" />
    </HStack>
  );
};

export default ScheduleTitle;

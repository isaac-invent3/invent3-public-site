import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

const ScheduleTitle = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="41px">
      <Flex width="full" maxW="141px">
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

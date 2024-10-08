import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextInput from '~/lib/components/UI/TextInput';

const Type = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="56px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Type"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field as={TextInput} name="type" type="number" label="Schedule Title" />
    </HStack>
  );
};

export default Type;

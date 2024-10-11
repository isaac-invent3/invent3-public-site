import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextareaInput from '~/lib/components/UI/TextArea';

const Description = () => {
  return (
    <HStack width="full" alignItems="flex-start" spacing="81px">
      <Flex width="full" maxW="130px">
        <SectionInfo
          title="Description"
          info="Add name that users can likely search with"
          isRequired
        />
      </Flex>
      <Field
        as={TextareaInput}
        name="description"
        label="Description"
        placeholder="Description"
        customStyle={{ height: '133px' }}
      />
    </HStack>
  );
};

export default Description;

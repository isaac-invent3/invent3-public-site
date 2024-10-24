import { Flex, HStack } from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import TextareaInput from '~/lib/components/UI/TextArea';

interface DescriptionProps {
  sectionMaxWidth: string;
  spacing: string;
  descriptionHeight?: string;
}
const Description = (props: DescriptionProps) => {
  const { sectionMaxWidth, spacing, descriptionHeight } = props;
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
        name="description"
        label="Description"
        placeholder="Description"
        customStyle={{ height: descriptionHeight ?? '133px' }}
      />
    </HStack>
  );
};

export default Description;

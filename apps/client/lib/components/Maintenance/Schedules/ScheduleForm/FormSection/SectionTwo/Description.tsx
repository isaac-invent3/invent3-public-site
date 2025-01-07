import { Flex, HStack } from '@chakra-ui/react';
import { FormSectionInfo, FormTextAreaInput } from '@repo/ui/components';
import { Field } from 'formik';

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
        <FormSectionInfo
          title="Description"
          info="Add details about the maintenance schedule."
          isRequired
        />
      </Flex>
      <Field
        as={FormTextAreaInput}
        name="description"
        label="Description"
        placeholder="Description"
        customStyle={{ height: descriptionHeight ?? '133px' }}
      />
    </HStack>
  );
};

export default Description;

import { SimpleGrid } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

const Email = () => {
  return (
    <SimpleGrid columns={{ base: 1 }} spacing="72px" width="full">
      <FormInputWrapper
        sectionMaxWidth="157px"
        customSpacing="65px"
        description="Enter Work Email"
        title="Work Email"
        isRequired
      >
        <Field
          as={FormTextInput}
          name="workEmail"
          type="text"
          label="Email"
          placeholder="Email"
        />
      </FormInputWrapper>
    </SimpleGrid>
  );
};

export default Email;

import { SimpleGrid } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

const Email = () => {
  return (
    <SimpleGrid columns={2} spacing="72px" width="full">
      <FormInputWrapper
        sectionMaxWidth="157px"
        customSpacing="65px"
        description="Personal Email"
        title="Personal Email"
      >
        <Field
          as={FormTextInput}
          name="personalEmail"
          type="text"
          label="Personal Email"
          placeholder="Personal Email"
        />
      </FormInputWrapper>
      <FormInputWrapper
        sectionMaxWidth="141px"
        customSpacing="25px"
        description="Work Email"
        title="Work Email"
      >
        <Field
          as={FormTextInput}
          name="workEmail"
          type="text"
          label="Work Email"
          placeholder="Work Email"
        />
      </FormInputWrapper>
    </SimpleGrid>
  );
};

export default Email;

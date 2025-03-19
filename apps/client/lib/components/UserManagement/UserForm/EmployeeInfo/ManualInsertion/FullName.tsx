import { SimpleGrid } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

const FullName = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="Provide User's Full name"
      title="Full Name"
      isRequired
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="11px" width="full">
        <Field
          as={FormTextInput}
          name="firstName"
          type="text"
          label="First Name"
          placeholder="First Name"
        />
        <Field
          as={FormTextInput}
          name="lastName"
          type="text"
          label="Last Name"
          placeholder="Last Name"
        />
      </SimpleGrid>
    </FormInputWrapper>
  );
};

export default FullName;

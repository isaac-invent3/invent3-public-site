import { SimpleGrid } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';
import React from 'react';

const ContactName = () => {
  return (
    <SimpleGrid
      width="full"
      columns={{ base: 1, md: 2 }}
      spacing={{ base: '24px', lg: '50px' }}
      alignItems={{ base: 'flex-end', lg: 'flex-start' }}
    >
      <FormInputWrapper
        sectionMaxWidth="157px"
        customSpacing="65px"
        description="Provide essential information about the contact person being added."
        title="Primary Contact Name"
        isRequired
      >
        <Field
          as={FormTextInput}
          name="contactFirstName"
          type="text"
          label="First Name"
          placeholder="First Name"
        />
      </FormInputWrapper>
      <Field
        as={FormTextInput}
        name="contactLastName"
        type="text"
        label="Last Name"
        placeholder="Last Name"
      />
    </SimpleGrid>
  );
};

export default ContactName;

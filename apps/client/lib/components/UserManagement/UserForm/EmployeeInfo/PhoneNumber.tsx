import { SimpleGrid } from '@chakra-ui/react';
import { FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { Field } from 'formik';

const PhoneNumber = () => {
  return (
    <FormInputWrapper
      sectionMaxWidth="157px"
      customSpacing="65px"
      description="User's Phone Number"
      title="Phone Number"
    >
      <SimpleGrid columns={3} gap="11px" width="full">
        <Field
          as={FormTextInput}
          name="mobileNumber"
          type="text"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
      </SimpleGrid>
    </FormInputWrapper>
  );
};

export default PhoneNumber;

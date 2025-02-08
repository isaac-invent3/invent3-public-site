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
      <Field
        as={FormTextInput}
        name="mobileNumber"
        type="text"
        label="Phone Number"
        placeholder="Enter Phone Number"
      />
    </FormInputWrapper>
  );
};

export default PhoneNumber;

/* eslint-disable no-unused-vars */
import { SimpleGrid, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { Button, FormSelect, FormTextInput } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { waitlistSchema } from '~/lib/schemas/general.schema';
import { useSubmitWaitlistRequestMutation } from '~/lib/redux/services/utility.services';

const CustomTextInputForm = ({
  name,
  placeholder,
  title,
  type = 'text',
}: {
  name: string;
  placeholder: string;
  title: string;
  type?:
    | 'text'
    | 'password'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime'
    | 'email'
    | 'url';
}) => {
  return (
    <Field
      as={FormTextInput}
      name={name}
      type={type}
      placeholder={placeholder}
      customStyle={{
        bgColor: 'white',
        border: 'none',
        rounded: '5px',
        _focus: { border: 'none' },
        _active: { border: 'none' },
        _placeholder: { color: 'neutral.600' },
      }}
      showTitleAfterContent={false}
      showErrorMessage={true}
    />
  );
};

const WaitListForm = () => {
  const [submitRequest, { isLoading }] = useSubmitWaitlistRequestMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      companyName: '',
      companyWebsite: '',
      fullName: '',
      industry: '',
      emailAddress: '',
    },
    validationSchema: waitlistSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await handleSubmit(
        submitRequest,
        {
          ...values,
          contactUsRequestTypes: 2,
        },
        'You have Successfully Joined the Waitlist'
      );
      if (response?.data) {
        resetForm();
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        style={{ width: '100%', maxWidth: '521px' }}
        onSubmit={formik.handleSubmit}
      >
        <VStack width="full" spacing="8px" alignItems="center" maxW="521px">
          <SimpleGrid columns={{ base: 1, lg: 2 }} width="full" gap="8px">
            <CustomTextInputForm
              name="companyName"
              title="Company Name"
              placeholder="Company Name"
            />
            <FormSelect
              name="industry"
              title="Industry / Sector"
              options={[
                { label: 'Technology', value: 'Technology' },
                { label: 'Finance', value: 'Finance' },
                { label: 'Healthcare', value: 'Healthcare' },
                { label: 'Education', value: 'Education' },
                { label: 'Retail', value: 'Retail' },
                { label: 'Manufacturing', value: 'Manufacturing' },
                { label: 'Other', value: 'Other' },
              ]}
              containerStyles={{
                width: '100%',
              }}
              selectStyles={{
                height: '50px',
                pt: '0px',
                backgroundColor: formik.errors.industry ? '#FFDCDC' : 'white',
                borderColor: 'none',
              }}
              showTitleAfterSelect={false}
              showErrorMessage={false}
            />
          </SimpleGrid>
          <CustomTextInputForm
            name="companyWebsite"
            title="Company Website"
            type="url"
            placeholder="Company Website"
          />
          <SimpleGrid columns={{ base: 1, lg: 2 }} width="full" gap="8px">
            <CustomTextInputForm
              name="fullName"
              title="Your Name"
              placeholder="Your Name"
            />
            <CustomTextInputForm
              name="emailAddress"
              title="Your Email Address"
              placeholder="Your Email Address"
            />
          </SimpleGrid>
          <Button
            type="submit"
            handleClick={() => console.log(formik.errors)}
            isLoading={isLoading || formik.isSubmitting}
            customStyles={{
              width: { base: 'full', lg: 'max-content' },
              px: { lg: '75px' },
              height: '48px',
              color: 'white',
            }}
          >
            Join the Waitlist
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default WaitListForm;

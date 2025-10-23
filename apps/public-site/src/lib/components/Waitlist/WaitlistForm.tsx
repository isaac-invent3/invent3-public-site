import { SimpleGrid, VStack, useToast } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { Button, FormSelect, FormTextInput } from '@repo/ui/components';
import { waitlistSchema } from '@/lib/schemas/general.schema';

const CustomTextInputForm = ({
  name,
  placeholder,
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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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
      setIsLoading(true);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!,
            subject: 'New Waitlist Signup',
            type: 'Waitlist',
            'Company Name': values.companyName,
            'Company Website': values.companyWebsite,
            'Full Name': values.fullName,
            Industry: values.industry,
            'Email Address': values.emailAddress,
          }),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: 'Joined Successfully 🎉',
            description: 'You have successfully joined the waitlist!',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
          resetForm();
        } else {
          toast({
            title: 'Submission Failed',
            description:
              result.message || 'Something went wrong. Try again later.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } catch (error) {
        toast({
          title: 'Network Error',
          description: 'Please check your connection and try again.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
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
              showErrorMessage={true}
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
            isLoading={formik.isSubmitting || isLoading}
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

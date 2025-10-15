import { HStack, SimpleGrid, Text, useToast, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  CheckBox,
  FormTextAreaInput,
  FormTextInput,
} from '@repo/ui/components';
import { contactSchema } from '@/lib/schemas/general.schema';
import { useState } from 'react';

const contactType = [
  {
    label: 'Request Information',
    value: 1,
  },
  {
    label: 'Book Demo',
    value: 2,
  },
];

const CustomTextInputForm = ({
  name,
  placeholder,
  title,
}: {
  name: string;
  placeholder: string;
  title: string;
}) => {
  return (
    <VStack alignItems="flex-start" width="full" spacing="8px">
      <Text
        size={{ base: 'md', lg: 'lg' }}
        fontWeight={{ lg: 800 }}
        color="primary.500"
      >
        {title}
      </Text>
      <Field
        as={FormTextInput}
        name={name}
        type="text"
        placeholder={placeholder}
        customStyle={{
          bgColor: 'none',
          border: '1px solid #656565',
          rounded: '5px',
          _focus: { border: '1px solid #656565' },
          _active: { border: '1px solid #656565' },
          height: { base: '46px', lg: '64px' },
        }}
        showTitleAfterContent={false}
      />
    </VStack>
  );
};

const ContactForm = () => {
  const [selectedType, setSelectedType] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      designation: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema: contactSchema,
      onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!,
            "Contact Request Type":
              contactType.find((item) => item.value === selectedType)?.label ||
              '',
            "Contact Person Name": `${values.firstName} ${values.lastName}`,
            company: values.company,
            designation: values.designation ?? "N/A",
            email: values.email,
            "Phone Number": values.phoneNumber,
            message: values.message,
            
          }),
        });

        const result = await response.json();

        if (result.success) {
          toast({
            title: 'Message Sent',
            description: 'Your message has been submitted successfully!',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
          resetForm();
        } else {
          toast({
            title: 'Submission Failed',
            description: result.message || 'Please try again later.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
        }
      } catch (error) {
        toast({
          title: 'Network Error',
          description: 'Could not send your message. Please check your internet connection.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack
          width="full"
          spacing={{ base: '16px', lg: '32px' }}
          alignItems="flex-start"
        >
          <HStack spacing="40px">
            {contactType.map((item, index) => (
              <HStack key={index} spacing={{ base: '8px', lg: '16px' }}>
                <CheckBox
                  isChecked={selectedType === item.value}
                  handleChange={() => setSelectedType(item.value)}
                />
                <Text color="primary.500" size={{ base: 'md', lg: 'lg' }}>
                  {item.label}
                </Text>
              </HStack>
            ))}
          </HStack>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            width="full"
            gap={{ base: '16px', lg: '34px' }}
          >
            <CustomTextInputForm
              name="firstName"
              title="First Name"
              placeholder="Enter First Name"
            />
            <CustomTextInputForm
              name="lastName"
              title="Last Name"
              placeholder="Enter Last Name"
            />
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            width="full"
            gap={{ base: '16px', lg: '34px' }}
          >
            <CustomTextInputForm
              name="company"
              title="Company"
              placeholder="Enter Company"
            />
            <CustomTextInputForm
              name="designation"
              title="Job Title"
              placeholder="Enter Job Title"
            />
          </SimpleGrid>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            width="full"
            gap={{ base: '16px', lg: '34px' }}
          >
            <CustomTextInputForm
              name="email"
              title="Email Address"
              placeholder="Enter Email Address"
            />
            <CustomTextInputForm
              name="phoneNumber"
              title="Phone Number"
              placeholder="Enter Phone Number"
            />
          </SimpleGrid>
          <VStack alignItems="flex-start" width="full" spacing="8px">
            <Text
              size={{ base: 'md', lg: 'lg' }}
              fontWeight={{ lg: 800 }}
              color="primary.500"
            >
              Tell us about your requirement
            </Text>
            <Field
              as={FormTextAreaInput}
              name="message"
              placeholder="Write a Message"
              customStyle={{
                ...(formik.errors.message ? {} : { bgColor: 'white' }),
                height: '204px',
                border: '1px solid #656565',
                rounded: '5px',
                _focus: { border: '1px solid #656565' },
                _active: { border: '1px solid #656565' },
              }}
              showTitleAfterContent={false}
            />
          </VStack>
          <Button
            type="submit"
            isLoading={formik.isSubmitting || isLoading}
            customStyles={{ width: { base: 'full', md: '203px' } }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default ContactForm;

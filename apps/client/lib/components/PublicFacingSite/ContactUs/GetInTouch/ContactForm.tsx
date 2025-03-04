/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { Button, FormTextAreaInput, FormTextInput } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateCategoryMutation } from '~/lib/redux/services/asset/category.services';
import { contactSchema } from '~/lib/schemas/general.schema';

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
  const [createCategory, { isLoading }] = useCreateCategoryMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      subject: '',
      content: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      //   const response = await handleSubmit(createCategory, values, 'Message Submitted Successfully');
      //   if (response?.data) {
      //   resetForm()
      //   }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack width="full" spacing="16px" alignItems="flex-start">
          <CustomTextInputForm
            name="name"
            title="Full Name"
            placeholder="Enter Full Name"
          />
          <CustomTextInputForm
            name="email"
            title="Email Address"
            placeholder="Enter Email Address"
          />
          <CustomTextInputForm
            name="subject"
            title="What is your enquiry about"
            placeholder="Enter Subject"
          />
          <VStack alignItems="flex-start" width="full" spacing="8px">
            <Text
              size={{ base: 'md', lg: 'lg' }}
              fontWeight={{ lg: 800 }}
              color="primary.500"
            >
              Message
            </Text>
            <Field
              as={FormTextAreaInput}
              name="content"
              placeholder="Write a Message"
              customStyle={{
                ...(formik.errors.content ? {} : { bgColor: 'white' }),
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
            isLoading={isLoading || formik.isSubmitting}
            customStyles={{ width: { base: 'full', md: '203px' } }}
          >
            Send Message
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default ContactForm;

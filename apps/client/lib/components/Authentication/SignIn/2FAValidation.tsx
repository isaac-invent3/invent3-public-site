'use client';

import { Flex, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { twoFASchema } from '~/lib/schemas/auth.schema';
import { Field, FormikProvider, useFormik } from 'formik';
import { Button, FormTextInput } from '@repo/ui/components';
import { authApi } from '~/lib/redux/services/auth.services';
import { useAppDispatch } from '~/lib/redux/hooks';
import { extractTenantFromUrl } from '~/lib/utils/helperFunctions';

interface TwoFactorValidationProps {
  handleSubmit: (code: string) => Promise<void>;
  email: string;
}

const TwoFactorValidation = (props: TwoFactorValidationProps) => {
  const { handleSubmit, email } = props;
  const dispatch = useAppDispatch();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      code: null!,
    },
    validationSchema: twoFASchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await handleSubmit(values.code);
      setSubmitting(false);
    },
  });

  const handleResendCode = async () => {
    const result = await dispatch(
      authApi.endpoints.check2FA.initiate({
        username: email,
        companySlug: extractTenantFromUrl()!,
      })
    );
    if (result?.data?.data?.twoFactorAuthuenticationEnabled) {
      toast({
        title: 'Code Resent',
        description: 'A new verification code has been sent to your email',
        status: 'success',
        position: 'top-right',
      });
    }
  };

  return (
    <Flex
      mt={{ base: '51px', lg: '0px' }}
      width="full"
      maxW="404px"
      direction="column"
      pt={{ base: '32px', lg: '71px' }}
      px={{ base: '16px', lg: '40px' }}
      pb={{ base: '32px', lg: '43px' }}
      bgColor="#0000004D"
      rounded={{ base: '8.49px', lg: '10px' }}
    >
      <VStack
        alignItems="flex-start"
        spacing={{ base: '13px', lg: '16px' }}
        mb={{ base: '34px' }}
      >
        <Heading
          as="h2"
          fontWeight={800}
          fontSize={{ base: '16px', md: '40px' }}
          lineHeight="100%"
          color="neutral.100"
        >
          Two-Factor Authentication
        </Heading>
        <Text
          color="neutral.300"
          fontSize={{ base: '14px', lg: '16px' }}
          lineHeight="100%"
          fontWeight={500}
        >
          Please check your email and enter the verification code to continue
          your login
        </Text>
      </VStack>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack spacing="40px" width="full">
            <Field
              as={FormTextInput}
              name="code"
              type="number"
              label="Verification Code"
              placeholder="Verification Code"
              variant="secondary"
            />
            <VStack width="full" spacing="24px" alignItems="flex-start">
              <Button
                isLoading={formik.isSubmitting}
                loadingText="Logging In..."
                type="submit"
              >
                Continue
              </Button>
              <Text
                fontWeight={700}
                as="span"
                color="brand.500"
                cursor="pointer"
                onClick={() => handleResendCode()}
              >
                Having trouble getting the code? Click here
              </Text>
            </VStack>
          </VStack>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default TwoFactorValidation;

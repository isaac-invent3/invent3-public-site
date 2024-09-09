'use client';

import React from 'react';
import { Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { loginSchema } from '~/lib/schemas/auth.schema';
import { Field, FormikProvider, useFormik } from 'formik';
import AuthLayout from '../AuthLayout';
import TextInput from '../../UI/TextInput';
import PrimaryButton from '../../UI/Button';
import SSOLogin from './SSOLogin';
import { handleCredentialsSignin } from '~/app/actions/authActions';
import { useRouter, useSearchParams } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const result = await handleCredentialsSignin({
          ...values,
          callbackUrl: ref,
        });
        if (result) {
          router.refresh();
        }
      } catch (error) {
        console.log('An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
      // setSubmitting(true);
      // const result = await signIn('credentials', {
      //   redirectTo: ref ?? '/dashboard',
      //   username: values.username,
      //   password: values.password,
      // });

      // if (result?.error) {
      //   // Handle error
      //   console.error(result.error);
      // } else {
      //   // Handle successful login
      //   console.log('Logged in successfully!');
      // }
      // setSubmitting(false);
    },
  });

  return (
    <AuthLayout>
      <Flex
        width="full"
        maxW="404px"
        direction="column"
        pt="71px"
        px="40px"
        pb="43px"
        bgColor="#0000004D"
        rounded="10px"
      >
        <VStack alignItems="flex-start" spacing="16px" mb="77px">
          <Heading
            as="h2"
            fontWeight={800}
            fontSize="40px"
            lineHeight="47.52px"
            color="neutral.100"
          >
            Sign in
          </Heading>
          <Text
            color="neutral.300"
            fontSize="15px"
            fontWeight={700}
            lineHeight="17.82px"
          >
            Have no account?
            <Link href="#">
              <Text fontWeight={700} as="span" color="brand.500">
                {' '}
                Contact admin
              </Text>
            </Link>
          </Text>
        </VStack>
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack spacing="16px" width="full" mb="40px">
              <Field
                as={TextInput}
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
                variant="secondary"
              />

              <Flex direction="column" w="full" gap="16px">
                <Field
                  as={TextInput}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  variant="secondary"
                />

                <Flex width="full" justifyContent="flex-end" color="brand.500">
                  <Link href="/forgot-password">
                    <Text size="md" fontWeight={700}>
                      Forgot Password?
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </VStack>

            <PrimaryButton
              isLoading={formik.isSubmitting}
              loadingText="Logging In..."
              type="submit"
            >
              Sign in
            </PrimaryButton>
          </form>
        </FormikProvider>
        <Flex alignItems="center" mt="64px" mb="32px">
          <Text
            size="lg"
            fontWeight={400}
            mr="12px"
            color="white"
            whiteSpace="nowrap"
          >
            SSO Login
          </Text>
          <Divider borderColor="white" borderWidth="1px" flexGrow={1} />
        </Flex>
        <SSOLogin />
      </Flex>
    </AuthLayout>
  );
};

export default SignIn;

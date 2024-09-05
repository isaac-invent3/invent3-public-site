'use client';

import React from 'react';
import { Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { loginSchema } from '~/lib/schemas/auth.schema';
import { Field, Form, Formik } from 'formik';
import AuthLayout from '../AuthLayout';
import TextInput from '../../UI/TextInput';
import PrimaryButton from '../../UI/Button';
import SSOLogin from './SSOLogin';

const SignIn = () => {
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
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={async () => {}}
        >
          <Form style={{ width: '100%' }}>
            <VStack spacing="16px" width="full" mb="40px">
              <Field
                as={TextInput}
                name="email"
                type="text"
                label="Email"
                placeholder="Email"
              />

              <Flex direction="column" w="full" gap="16px">
                <Field
                  as={TextInput}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                />

                <Flex width="full" justifyContent="flex-end" color="brand.500">
                  <Link href="/forgot-password">
                    <Text fontWeight={700} fontSize="14px" lineHeight="16.63px">
                      Forgot Password?
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </VStack>

            <PrimaryButton
              isLoading={false}
              loadingText="Logging In..."
              type="submit"
            >
              Sign in
            </PrimaryButton>
          </Form>
        </Formik>
        <Flex alignItems="center" mt="64px" mb="32px">
          <Text
            fontSize="16px"
            fontWeight={400}
            lineHeight="19.01px"
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

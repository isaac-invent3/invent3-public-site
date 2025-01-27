'use client';

import { Flex, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { Button, FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import PageHeader from '~/lib/components/UI/PageHeader';
import { userRoleSchema } from '~/lib/schemas/user.schema';
import Permissions from '../../Permissions';

const UserRoleForm = () => {
  const formik = useFormik({
    initialValues: {
      roleName: '',
    },
    validationSchema: userRoleSchema,
    enableReinitialize: true,
    onSubmit: async () => {},
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Add New Role</PageHeader>
      <Flex width="full" height="full" direction="column" mt="32px">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              spacing="40px"
              width="full"
              alignItems="flex-start"
              bgColor="white"
              pt="24px"
              pb="33px"
              minH="60vh"
            >
              <SimpleGrid columns={2} width="full" px="24px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  spacing="40px"
                  description="Provide a title for this role"
                  title="Role Name"
                  isRequired
                >
                  <VStack alignItems="flex-start" spacing="4px" width="full">
                    <Field
                      as={FormTextInput}
                      name="roleName"
                      type="text"
                      label="Role Name"
                      placeholder="Role Name"
                    />
                  </VStack>
                </FormInputWrapper>
              </SimpleGrid>
              <Permissions />
            </VStack>
            <HStack width="full" justifyContent="space-between" mt="24px">
              <Button
                variant="secondary"
                customStyles={{ width: 'max-content' }}
                href={`/${ROUTES.USERS}`}
              >
                Cancel
              </Button>
              <Button type="submit" customStyles={{ width: 'max-content' }}>
                Save Role
              </Button>
            </HStack>
          </form>
        </FormikProvider>
      </Flex>
    </Flex>
  );
};

export default UserRoleForm;

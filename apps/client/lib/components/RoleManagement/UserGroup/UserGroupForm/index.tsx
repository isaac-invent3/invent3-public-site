'use client';

import {
  Avatar,
  AvatarGroup,
  Flex,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import { Button, FormInputWrapper, FormTextInput } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import PageHeader from '~/lib/components/UI/PageHeader';
import { userGroupSchema } from '~/lib/schemas/user.schema';
import Permissions from '../../Permissions';
import { useState } from 'react';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';

const UserGroupForm = () => {
  const [selectedUser, setSelectedUser] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      groupName: '',
      users: [],
    },
    validationSchema: userGroupSchema,
    enableReinitialize: true,
    onSubmit: async () => {},
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Add New User Group</PageHeader>
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
              <SimpleGrid columns={2} width="full" px="24px" gap="73px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="40px"
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
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="40px"
                  description="Assign responsible team member for the tasks."
                  title="Add Users"
                  isRequired
                >
                  <HStack justifyContent="space-between" width="full">
                    <AvatarGroup size="sm" max={3}>
                      {selectedUser.map((item, index) => (
                        <Avatar name={item} src="" key={index} />
                      ))}
                    </AvatarGroup>
                    <UserDisplayAndAddButton
                      selectedUser={null}
                      handleSelectUser={(option) => {
                        if (
                          !(formik.values.users as number[]).includes(
                            option?.value as number
                          )
                        ) {
                          formik.setFieldValue('users', [
                            ...formik.values.users,
                            option?.value as number,
                          ]);
                          setSelectedUser((prev) => [
                            ...prev,
                            option?.label as string,
                          ]);
                        }
                      }}
                    />
                  </HStack>
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
                Save User Group
              </Button>
            </HStack>
          </form>
        </FormikProvider>
      </Flex>
    </Flex>
  );
};

export default UserGroupForm;

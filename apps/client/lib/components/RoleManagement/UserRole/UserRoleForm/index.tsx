'use client';

import {
  Flex,
  HStack,
  SimpleGrid,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericSuccessModal,
} from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { useCreateRoleModulePermissionMutation } from '~/lib/redux/services/role.services';
import { userRoleSchema } from '~/lib/schemas/user.schema';
import { FORM_ENUM, ROUTES } from '~/lib/utils/constants';
import Permissions from '../../Permissions';
import withFormLeaveDialog from '~/lib/components/UI/FormLeaveDialogProvider';

const UserRoleForm = () => {
  const { formRoleModules } = useAppSelector((state) => state.role);
  const { handleSubmit } = useCustomMutation();
  const [createRolePermission, { isLoading }] =
    useCreateRoleModulePermissionMutation();
  const { isOpen, onOpen } = useDisclosure();
  const [permissionError, setPermissionError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      roleName: '',
      description: undefined,
    },
    validationSchema: userRoleSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setPermissionError('');
      if (formRoleModules.length < 1) {
        setPermissionError('Please select a permission');
        return;
      }
      setSubmitting(true);
      const session = await getSession();
      const username = session?.user?.username;
      const selectedPermissions = formRoleModules.map((item) => ({
        roleSystemModuleContextPermissionId:
          item.roleSystemModuleContextPermissionId,
        roleId: null,
        systemModuleContextTypeId: item.systemModuleContextTypeId!,
        systemSubModuleContextTypeId: item.systemSubModuleContextTypeId!,
        actionType: FORM_ENUM.add,
        changeInitiatedBy: username!,
      }));
      const response = await handleSubmit(
        createRolePermission,
        {
          createRoleDto: {
            roleName: values.roleName!,
            description: values.description!,
            createdBy: username!,
          },
          createRoleSystemModuleContextPermissionDtos: selectedPermissions,
        },
        ''
      );
      if (response?.data) {
        onOpen();
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Flex
        width="full"
        direction="column"
        pb="24px"
        px={{ base: '16px', md: 0 }}
      >
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
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  width="full"
                  gap="29px"
                  px="24px"
                >
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
                    title="Description"
                    description="Provide details about this role"
                    isRequired
                  >
                    <Field
                      as={FormTextAreaInput}
                      name="description"
                      type="text"
                      label="Description"
                      placeholder="What’s the task about?"
                      customStyle={{ height: '96px' }}
                    />
                  </FormInputWrapper>
                </SimpleGrid>
                <Permissions />
              </VStack>
              {permissionError && (
                <Flex width="full" mt="4px">
                  <ErrorMessage>{permissionError}</ErrorMessage>
                </Flex>
              )}
              <HStack width="full" justifyContent="space-between" mt="24px">
                <Button
                  variant="secondary"
                  customStyles={{ width: 'max-content' }}
                  href={`/${ROUTES.USERS}`}
                >
                  Cancel
                </Button>
                <Button
                  customStyles={{ width: 'max-content' }}
                  handleClick={() => formik.handleSubmit()}
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Save Role
                </Button>
              </HStack>
            </form>
          </FormikProvider>
        </Flex>
      </Flex>
      <GenericSuccessModal
        isOpen={isOpen}
        onClose={() => router.push(`${ROUTES.ROLES}`)}
        successText="Role and Permissions Created Successfully"
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button customStyles={{ width: '193px' }} href={`/${ROUTES.ROLES}`}>
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default withFormLeaveDialog(UserRoleForm);

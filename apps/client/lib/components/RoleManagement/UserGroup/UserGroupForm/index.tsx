'use client';

import {
  Avatar,
  AvatarGroup,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextInput,
  GenericSuccessModal,
} from '@repo/ui/components';
import PageHeader from '~/lib/components/UI/PageHeader';
import { userGroupSchema } from '~/lib/schemas/user.schema';
import { ROUTES } from '~/lib/utils/constants';
import { AddIcon, PenIcon } from '~/lib/components/CustomIcons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import Roles from './Roles';
import AddUserModal from './UserSelectModals/AddUserModal';
import EditUserModal from './UserSelectModals/EditUserModal';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateUserGroupMutation,
  useUpdateUserGroupMutation,
} from '~/lib/redux/services/user.services';
import mapIdsToObject from '~/lib/components/Common/HelperFunctions/mapIdsToObject';
import _ from 'lodash';
import { useEffect } from 'react';
import { updateUserGroupFormDetails } from '~/lib/redux/slices/RoleSlice';
import withFormLeaveDialog from '~/lib/components/UI/FormLeaveDialogProvider';

interface UserGroupFormProps {
  type: 'create' | 'edit';
}
const UserGroupForm = ({ type }: UserGroupFormProps) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenAddUser,
    onClose: onCloseAddUser,
    onOpen: onOpenAddUser,
  } = useDisclosure();
  const {
    isOpen: isOpenEditUser,
    onClose: onCloseEditUser,
    onOpen: onOpenEditUser,
  } = useDisclosure();
  const {
    groupId,
    groupName,
    users,
    formUserGroupRoleIds,
    newlyAddedUsers,
    initialUserGroupRoleIds,
    removedUserIds,
  } = useAppSelector((state) => state.role.userGroupFormDetails);
  const { handleSubmit } = useCustomMutation();
  const [createUserGroup, { isLoading: isCreating }] =
    useCreateUserGroupMutation();
  const [updateUserGroup, { isLoading: isUpdating }] =
    useUpdateUserGroupMutation();
  const {
    isOpen: isOpenSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      groupName: groupName,
      userIds: newlyAddedUsers.map((item) => item.userId),
      roleIds: formUserGroupRoleIds,
    },
    validationSchema: userGroupSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      let response;
      const createUserGroupPayload = {
        createGroupDto: {
          groupName: values.groupName!,
          createdBy: session?.user?.username!,
        },
        userIds: values.userIds,
        roleIds: values.roleIds,
      };

      // Get newly added role IDs (in formUserGroupRoleIds but not in initialUserGroupRoleIds)
      const newlyAddedRoleIds = _.difference(
        formUserGroupRoleIds,
        initialUserGroupRoleIds
      );

      // Get deleted role IDs (in initialUserGroupRoleIds but not in formUserGroupRoleIds)
      const deletedRoleIds = _.difference(
        initialUserGroupRoleIds,
        formUserGroupRoleIds
      );

      // New User Ids
      const newUserIds = _.difference(
        newlyAddedUsers.map((item) => item.userId),
        users.map((item) => item.userId)
      );
      // Deleted User Ids
      const deletedUserId = _.intersection(
        users.map((item) => item.userId),
        removedUserIds
      );
      const updateUserGroupPayload = {
        groupId: groupId!,
        groupName: values.groupName!,
        roles: mapIdsToObject(newlyAddedRoleIds, deletedRoleIds)!,
        userIds: mapIdsToObject(newUserIds, deletedUserId)!,
        lastModifiedBy: session?.user?.username!,
      };
      if (type === 'create') {
        response = await handleSubmit(
          createUserGroup,
          createUserGroupPayload,
          ''
        );
      } else {
        response = await handleSubmit(
          updateUserGroup,
          updateUserGroupPayload,
          ''
        );
      }

      if (response?.data) {
        onOpenSuccess();
      }
    },
  });
  useEffect(() => {
    dispatch(
      updateUserGroupFormDetails({ groupName: formik.values.groupName! })
    );
  }, [formik.values.groupName]);

  return (
    <>
      <Flex
        width="full"
        direction="column"
        pb="24px"
        px={{ base: '16px', md: 0 }}
      >
        <PageHeader>{type === 'create' ? 'Add' : 'Edit'} User Group</PageHeader>
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
                  px="24px"
                  gap={{ base: '24px', lg: '73px' }}
                >
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="40px"
                    description="Provide a title for this name"
                    title="Group Name"
                    isRequired
                  >
                    <VStack alignItems="flex-start" spacing="4px" width="full">
                      <Field
                        as={FormTextInput}
                        name="groupName"
                        type="text"
                        label="User Group Name"
                        placeholder="Group Name"
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
                    <VStack alignItems="flex-start" spacing="4px">
                      <HStack justifyContent="space-between" width="full">
                        <AvatarGroup
                          size="sm"
                          max={3}
                          display={newlyAddedUsers.length > 0 ? 'flex' : 'none'}
                        >
                          {newlyAddedUsers.map((item, index) => (
                            <Avatar
                              name={`${item.firstName} ${item.lastName}`}
                              src=""
                              key={index}
                              width="44px"
                              height="44px"
                            />
                          ))}
                        </AvatarGroup>
                        <HStack spacing="8px">
                          {newlyAddedUsers.length > 0 && (
                            <IconButton
                              variant="solid"
                              bgColor="#F1F1F1"
                              aria-label="Edit Users"
                              icon={<PenIcon color="#374957" boxSize="20px" />}
                              sx={{
                                width: '50px',
                                height: '50px',
                                rounded: 'full',
                              }}
                              onClick={onOpenEditUser}
                            />
                          )}
                          <IconButton
                            variant="solid"
                            bgColor="#F1F1F1"
                            aria-label="Add User"
                            icon={<AddIcon color="#374957" boxSize="24px" />}
                            sx={{
                              width: '50px',
                              height: '50px',
                              rounded: 'full',
                            }}
                            onClick={onOpenAddUser}
                          />
                        </HStack>
                      </HStack>
                      {formik.submitCount > 0 &&
                        formik.touched &&
                        formik.errors.userIds !== undefined && (
                          <ErrorMessage>{formik.errors.userIds}</ErrorMessage>
                        )}
                    </VStack>
                  </FormInputWrapper>
                </SimpleGrid>
                <Roles />
              </VStack>
              {formik.submitCount > 0 &&
                formik.touched &&
                formik.errors.roleIds !== undefined && (
                  <Flex width="full" mt="4px">
                    <ErrorMessage>{formik.errors.roleIds}</ErrorMessage>
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
                  type="submit"
                  customStyles={{ width: 'max-content' }}
                  isLoading={isCreating || isUpdating}
                >
                  {type === 'create' ? 'Create' : 'Update'} User Group
                </Button>
              </HStack>
            </form>
          </FormikProvider>
        </Flex>
      </Flex>
      {isOpenAddUser && (
        <AddUserModal isOpen={isOpenAddUser} onClose={onCloseAddUser} />
      )}
      {isOpenEditUser && (
        <EditUserModal isOpen={isOpenEditUser} onClose={onCloseEditUser} />
      )}
      <GenericSuccessModal
        isOpen={isOpenSuccess}
        onClose={() => {}}
        successText={`User Group ${type === 'create' ? 'Created' : 'updated'} Successfully`}
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button customStyles={{ width: '193px' }} href={`/${ROUTES.ROLES}`}>
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default withFormLeaveDialog(UserGroupForm);

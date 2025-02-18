'use client';
import {
  Avatar,
  AvatarGroup,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  Icon,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  BackButton,
  Button,
  ErrorMessage,
  FormInputWrapper,
  FormTextInput,
  GenericDrawer,
  GenericSuccessModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { UserGroupInfoHeader } from '~/lib/interfaces/user.interfaces';
import { userGroupSchema } from '~/lib/schemas/user.schema';
import { useState } from 'react';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import RoleSelect from './RoleSelect';
import { getSession } from 'next-auth/react';
import { CloseIcon } from '~/lib/components/CustomIcons';
import { Option } from '@repo/interfaces';
import { useCreateUserGroupMutation } from '~/lib/redux/services/user.services';

interface UserGroupFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: UserGroupInfoHeader;
}
const UserGroupDrawer = (props: UserGroupFormDrawerProps) => {
  const { isOpen, onClose, data } = props;
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onClose: onCloseSuccess,
    onOpen: onOpenSuccess,
  } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Option[]>([]);
  const [createUserGroup, { isLoading }] = useCreateUserGroupMutation();

  const formik = useFormik({
    initialValues: {
      groupName: '',
      userIds: [],
      roleIds: [],
    },
    validationSchema: userGroupSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      const payload = {
        createGroupDto: {
          groupName: values.groupName,
          createdBy: session?.user?.username!,
        },
        userIds: values.userIds,
        roleIds: values.roleIds,
      };
      const response = await handleSubmit(createUserGroup, payload, '');

      if (response?.data) {
        onOpenSuccess();
      }
    },
  });

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="681px">
        <DrawerHeader
          p={0}
          m={0}
          px={{ base: '24px', md: '32px' }}
          mt="20px"
          mb="10px"
          width="max-content"
        >
          <BackButton handleClick={onClose} />
        </DrawerHeader>
        <DrawerBody p={0} m={0}>
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px={{ base: '24px', md: '32px' }}
                pb="32px"
                pt="50px"
                spacing={0}
                alignItems="flex-start"
              >
                <ModalHeading
                  heading={data ? 'Edit User Group' : 'Add New User Group'}
                />

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="27px" mt="60px">
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="40px"
                    description="Provide a name for this group"
                    title="Group Name"
                    isRequired
                  >
                    <Field
                      as={FormTextInput}
                      name="groupName"
                      type="text"
                      label="Group Name"
                      placeholder="Group Name"
                    />
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="40px"
                    description="Provide a title for this role"
                    title="Roles"
                    isRequired
                  >
                    <RoleSelect selectName="roleIds" selectTitle="Role" />
                  </FormInputWrapper>
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="40px"
                    description="Users to be assigned to the group."
                    title="Add Users"
                    isRequired
                  >
                    <VStack width="full" spacing="4px" alignItems="flex-start">
                      <HStack justifyContent="space-between" width="full">
                        <AvatarGroup
                          size="sm"
                          max={3}
                          display={selectedUser.length > 0 ? 'flex' : 'none'}
                        >
                          {selectedUser.map((user, index) => (
                            <HStack
                              position="relative"
                              justifyContent="center"
                              alignItems="center"
                              overflow="hidden"
                              rounded="full"
                              role="group"
                              cursor="pointer"
                            >
                              <Icon
                                as={CloseIcon}
                                position="absolute"
                                boxSize="24px"
                                zIndex={999}
                                color="red.500"
                                display="none"
                                _groupHover={{
                                  display: 'flex',
                                }}
                                onClick={() => {
                                  setSelectedUser(
                                    selectedUser.filter(
                                      (item) => item.value !== user.value
                                    )
                                  );
                                  formik.setFieldValue(
                                    'userIds',
                                    formik.values.userIds.filter(
                                      (id) => id !== user.value
                                    )
                                  );
                                }}
                              />
                              <Avatar
                                name={user.label}
                                src=""
                                key={index}
                                width="44px"
                                height="44px"
                                opacity={1}
                                _groupHover={{
                                  opacity: 0.7,
                                }}
                              />
                            </HStack>
                          ))}
                        </AvatarGroup>
                        <UserDisplayAndAddButton
                          selectedUser={null}
                          handleSelectUser={(option) => {
                            if (
                              !(formik.values.userIds as number[]).includes(
                                option?.value as number
                              )
                            ) {
                              formik.setFieldValue('userIds', [
                                ...formik.values.userIds,
                                option?.value as number,
                              ]);
                              setSelectedUser((prev) => [
                                ...prev,
                                option as Option,
                              ]);
                            }
                          }}
                        />
                      </HStack>
                      {formik.touched &&
                        formik.errors.userIds !== undefined && (
                          <ErrorMessage>{formik.errors.userIds}</ErrorMessage>
                        )}
                    </VStack>
                  </FormInputWrapper>
                </VStack>
                {/* Main Form Ends Here */}
              </VStack>
            </form>
          </FormikProvider>
        </DrawerBody>
        <DrawerFooter pb="38px">
          <HStack width="full" spacing="16px" justifyContent="flex-end">
            <Button
              variant="secondary"
              customStyles={{ width: '138px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              customStyles={{ width: '237px' }}
              isLoading={isLoading}
              handleClick={formik.handleSubmit}
            >
              Save User Group
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
      <GenericSuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        successText="User Group Created Successfully"
        mainModalStyle={{ closeOnOverlayClick: false, closeOnEsc: false }}
      >
        <Button customStyles={{ width: '193px' }} handleClick={onCloseSuccess}>
          Continue
        </Button>
      </GenericSuccessModal>
    </>
  );
};

export default UserGroupDrawer;

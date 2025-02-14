'use client';
import {
  Avatar,
  AvatarGroup,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  BackButton,
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericDrawer,
  ModalHeading,
} from '@repo/ui/components';
// import useCustomMutation from '~/lib/hooks/mutation.hook';
import { UserGroupInfoHeader } from '~/lib/interfaces/user.interfaces';
import { userGroupSchema } from '~/lib/schemas/user.schema';
import { useState } from 'react';
import UserDisplayAndAddButton from '~/lib/components/Common/UserDisplayAndAddButton';
import RoleSelect from './RoleSelect';

interface UserGroupFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data?: UserGroupInfoHeader;
}
const UserGroupDrawer = (props: UserGroupFormDrawerProps) => {
  const { isOpen, onClose, data } = props;
  // const { handleSubmit } = useCustomMutation();
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      groupName: '',
      userIds: [],
      roleIds: [],
    },
    validationSchema: userGroupSchema,
    enableReinitialize: true,
    onSubmit: async () => {},
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
                    <HStack justifyContent="space-between" width="full">
                      <AvatarGroup
                        size="sm"
                        max={3}
                        display={selectedUser.length > 0 ? 'flex' : 'none'}
                      >
                        {selectedUser.map((item, index) => (
                          <Avatar
                            name={item}
                            src=""
                            key={index}
                            width="44px"
                            height="44px"
                          />
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
                            formik.setFieldValue('users', [
                              ...formik.values.userIds,
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
              isLoading={false}
              handleClick={formik.handleSubmit}
            >
              Save User Group
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
    </>
  );
};

export default UserGroupDrawer;

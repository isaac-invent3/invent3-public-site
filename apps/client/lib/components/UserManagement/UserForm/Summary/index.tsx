import { FormActionButtons } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import UserSuccessModal from './SuccessModal';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '~/lib/redux/hooks';
import { CreateUserPayload } from '~/lib/interfaces/user.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '~/lib/redux/services/user.services';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const userFormDetails = useAppSelector((state) => state.user.userForm);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();
  const [createUser, { isLoading: createLoading }] = useCreateUserMutation({});
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation({});

  //Store Username so that it is retained in the state.
  useEffect(() => {
    if (data) {
      setUsername(data?.user?.username);
    }
  }, [data]);

  const USER = {
    username: userFormDetails.firstName!,
    email: userFormDetails.personalEmail!,
    phoneNumber: userFormDetails.mobileNumber!,
    firstName: userFormDetails.firstName!,
    lastName: userFormDetails.lastName!,
    companyId: 1,
    employeeId: null,
    bio: null,
    createdBy: username!,
  };

  const createUserPayload: CreateUserPayload = {
    createUserDto: USER,
    createUserImageDto: [
      {
        imageName: userFormDetails.picture?.imageName!,
        base64PhotoImage: userFormDetails.picture?.base64PhotoImage!,
        isPrimaryImage: true,
        userId: null,
        createdBy: username!,
      },
    ],
    createUserDocumentDto:
      userFormDetails.documents.length >= 1
        ? userFormDetails.documents.map((document) => ({
            documentName: document.documentName!,
            base64Document: document.base64Document!,
            createdBy: username!,
          }))
        : null,
    userDocumentIds: null,
    userRoles: userFormDetails?.userRoleIds,
    userGroups: userFormDetails?.userGroupIds,
  };

  const handleSumbitUser = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createUser, createUserPayload, '');
    } else {
      response = await handleSubmit(updateUser, createUserPayload, '');
    }
    if (response?.data) {
      onOpen();
    }
  };

  return (
    <>
      <Flex
        width="full"
        gap="16px"
        direction="column"
        display={activeStep === 4 ? 'flex' : 'none'}
      >
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="40px"
          bgColor="white"
          pt="16px"
          pl="16px"
          pr={{ base: '16px', md: '44px' }}
          pb="40px"
          rounded="8px"
          minH="60vh"
        >
          <SectionOne />
          <SectionTwo />
        </VStack>
        <FormActionButtons
          cancelLink={`/${ROUTES.USERS}`}
          totalStep={4}
          activeStep={4}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitUser}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      <UserSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        successText={
          type === 'create'
            ? 'User Created Successfully!'
            : 'User Updated Sucessfully'
        }
      />
    </>
  );
};

export default SummaryStep;

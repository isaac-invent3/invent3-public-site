import { FormActionButtons } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { FORM_ENUM, ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import UserSuccessModal from './SuccessModal';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  CreateUserPayload,
  UpdateUserPayload,
} from '~/lib/interfaces/user.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '~/lib/redux/services/user.services';
import mapIdsToObject from '~/lib/components/Common/HelperFunctions/mapIdsToObject';
import _ from 'lodash';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  isManual: boolean;
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type, isManual } = props;
  const step = isManual ? 0 : 1;
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
    userId: userFormDetails.userId!,
    username: userFormDetails.firstName!,
    email: userFormDetails.workEmail!,
    phoneNumber: userFormDetails.mobileNumber!,
    firstName: userFormDetails.firstName!,
    lastName: userFormDetails.lastName!,
    designationId: userFormDetails.jobTitleId,
    companyId: 1,
    employeeId: null,
    bio: null,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const LOCATION = {
    lgaId: userFormDetails.cityId,
    facilityId: userFormDetails.branchId,
    locationId: null,
    buildingId: null,
    floorId: null,
    departmentId: null,
    roomId: null,
    aisleId: null,
    shelfId: null,
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const createUserPayload: CreateUserPayload = {
    createUserDto: USER,
    createLocationDto: LOCATION,
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

  //Roles
  const newlyAddedRoles = _.difference(
    userFormDetails.userRoleIds,
    userFormDetails.initialRoleIds
  );
  const deletedRoles = _.difference(
    userFormDetails.initialRoleIds,
    userFormDetails.userRoleIds
  );
  // Groups
  const newlyAddedGroups = _.difference(
    userFormDetails.userGroupIds,
    userFormDetails.initialGroupIds
  );
  const deletedGroups = _.difference(
    userFormDetails.initialGroupIds,
    userFormDetails.userGroupIds
  );

  const formDocumentIds = userFormDetails.documents.map(
    (item) => item.documentId as number
  );
  // Documents
  const newlyAddedDocuments = _.difference(
    formDocumentIds,
    userFormDetails.initialDocumentIds
  );
  const deletedDocuments = _.difference(
    userFormDetails.initialDocumentIds,
    formDocumentIds
  );
  const updateUserPayload: UpdateUserPayload = {
    updateUserDto: USER,
    updateLocationDto: LOCATION,
    multiPurposeUserImageDto: [
      {
        imageName: userFormDetails.picture?.imageName!,
        base64PhotoImage: userFormDetails.picture?.base64PhotoImage!,
        isPrimaryImage: true,
        userId: null,
        actionType: FORM_ENUM.add,
        changeInitiatedBy: username!,
      },
    ],
    multiPurposeUserDocumentDto:
      userFormDetails.documents.length >= 1
        ? userFormDetails.documents
            .filter((item) =>
              newlyAddedDocuments.includes(item.documentId as number)
            )
            .map((document) => ({
              documentId: null,
              documentName: document.documentName!,
              base64Document: document.base64Document!,
              actionType: FORM_ENUM.add,
              changeInitiatedBy: username!,
            }))
        : null,
    userDocuments: mapIdsToObject([], deletedDocuments),
    userRoles: mapIdsToObject(newlyAddedRoles, deletedRoles),
    userGroups: mapIdsToObject(newlyAddedGroups, deletedGroups),
  };

  const handleSumbitUser = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createUser, createUserPayload, '');
    } else {
      response = await handleSubmit(updateUser, updateUserPayload, '');
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
        display={activeStep === 5 - step ? 'flex' : 'none'}
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
          totalStep={isManual ? 5 : 4}
          activeStep={isManual ? 5 : 4}
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

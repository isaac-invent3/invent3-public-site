import { FormActionButtons } from '@repo/ui/components';
import React, { useEffect, useState } from 'react';
import { FORM_ENUM, ROUTES } from '~/lib/utils/constants';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Flex, useDisclosure, VStack } from '@chakra-ui/react';
import VendorSuccessModal from './SuccessModal';
import { useAppSelector } from '~/lib/redux/hooks';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { useUpdateVendorMutation } from '~/lib/redux/services/vendor.services';
import {
  CreateVendorPayload,
  UpdateVendorPayload,
} from '~/lib/interfaces/vendor.interfaces';
import _ from 'lodash';

interface SummaryStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
  // eslint-disable-next-line no-unused-vars
  handleCreateVendor?: (vendor: CreateVendorPayload) => void;
  cancelAction?: () => void;
}

const SummaryStep = (props: SummaryStepProps) => {
  const { activeStep, setActiveStep, type, handleCreateVendor, cancelAction } =
    props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const vendorFormDetails = useAppSelector((state) => state.vendor.vendorForm);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();
  const [updateVendor, { isLoading: updateLoading }] = useUpdateVendorMutation(
    {}
  );

  //Store Username so that it is retained in the state.
  useEffect(() => {
    if (data) {
      setUsername(data?.user?.username);
    }
  }, [data]);

  const VENDOR = {
    vendorName: vendorFormDetails.vendorName!,
    contactFirstName: vendorFormDetails.contactFirstName!,
    contactLastName: vendorFormDetails.contactLastName!,
    description: vendorFormDetails.description!,
    address: vendorFormDetails.address1!,
    phoneNumber: vendorFormDetails.primaryPhoneNumber!,
    emailAddress: vendorFormDetails.primaryEmail!,
    statusId: vendorFormDetails.vendorStatusId!,
    vendorCategoryId: vendorFormDetails.categoryId!,
  };
  const formDocumentIds = vendorFormDetails.vendorDocuments.map(
    (item) => item.documentId as number
  );
  // Documents
  const newlyAddedDocuments = _.difference(
    formDocumentIds,
    vendorFormDetails.initialDocumentIds
  );
  // const deletedDocuments = _.difference(
  //   vendorFormDetails.initialDocumentIds,
  //   formDocumentIds
  // );

  const createVendorPayload: CreateVendorPayload = {
    createVendor: { ...VENDOR, createdBy: username! },
    createVendorImageDto: [
      {
        vendorImageName: vendorFormDetails.logo?.imageName!,
        base64PhotoImage: vendorFormDetails.logo?.base64PhotoImage!,
        base64Prefix: vendorFormDetails.logo?.base64Prefix!,
        isPrimaryImage: true,
        vendorId: null,
        createdBy: username!,
      },
    ],
    createVendorContractDocumentDto:
      vendorFormDetails.vendorDocuments.length >= 1
        ? vendorFormDetails.vendorDocuments.map((document) => ({
            contractId: null,
            documentId: null,
            documentName: document.documentName!,
            base64ContractDocument: document.base64Document!,
            documentType: document.base64Prefix!,
            createdBy: username!,
          }))
        : null,
  };

  const updateVendorPayload: UpdateVendorPayload = {
    updateVendorDto: {
      ...VENDOR,
      vendorId: vendorFormDetails.vendorId!,
      lastModifiedBy: username!,
    },
    multiPurposeVendorImageDto: [
      {
        vendorImageName: vendorFormDetails.logo?.imageName!,
        base64PhotoImage: vendorFormDetails.logo?.base64PhotoImage!,
        base64Prefix: vendorFormDetails.logo?.base64Prefix!,
        isPrimaryImage: true,
        vendorId: null,
        actionType: FORM_ENUM.add,
        changeInitiatedBy: username!,
      },
    ],
    multiPurposeVendorContractDocumentDto:
      vendorFormDetails.vendorDocuments.length >= 1
        ? vendorFormDetails.vendorDocuments
            .filter((item) =>
              newlyAddedDocuments.includes(item.documentId as number)
            )
            .map((document) => ({
              contractId: null,
              documentId: null,
              documentName: document.documentName!,
              base64ContractDocument: document.base64Document!,
              documentType: document.base64Prefix!,
              actionType: FORM_ENUM.add,
              changeInitiatedBy: username!,
            }))
        : null,
  };

  const handleSumbitVendor = async () => {
    if (type === 'create' && handleCreateVendor) {
      handleCreateVendor(createVendorPayload);
    }
    if (type === 'edit') {
      let response;
      response = await handleSubmit(updateVendor, updateVendorPayload, '');

      if (response?.data) {
        onOpen();
      }
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
          cancelLink={type === 'edit' ? `/${ROUTES.VENDOR}` : undefined}
          cancelAction={
            type === 'create' && cancelAction ? cancelAction : undefined
          }
          totalStep={4}
          activeStep={4}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitVendor}
          isLoading={updateLoading}
          loadingText="Updating..."
        />
      </Flex>
      <VendorSuccessModal
        isOpen={isOpen}
        onClose={onClose}
        successText={
          type === 'create'
            ? 'Vendor Created Successfully!'
            : 'Vendor Updated Sucessfully'
        }
      />
    </>
  );
};

export default SummaryStep;

'use client';

import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { assetTransferSchema } from '~/lib/schemas/asset/main.schema';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import moment from 'moment';
import AssetSuccessModal from '../../Modals/AssetSuccessModal';
import SectionTwo from '../SectionTwo';
import BulkAssetTable from '../../Common/BulkAssetTable';
import { Button } from '@repo/ui/components';
import {
  getSelectedAssetIds,
  removeSelectedAssetIds,
} from '../../Common/utils';
import PageHeader from '~/lib/components/UI/PageHeader';
import { ASSET_BULK_ACTION_TYPE, ROUTES } from '~/lib/utils/constants';
import { useRouter } from 'next/navigation';
import { useCreateBulkAssetActionMutation } from '~/lib/redux/services/asset/bulkAction.services';
import ApprovalWorkflowWarning from '../../Common/ApprovalWorkflowWarning';
import TransferDisposalInProgressModal from '../../Modals/TransferDisposalInProgressModal';

interface BulkTransferProps {
  hasWorkflow: boolean;
  assetsInWorkFlow: number[];
}
const BulkTransfer = (props: BulkTransferProps) => {
  const { hasWorkflow, assetsInWorkFlow } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const [createBulkAction, { isLoading }] = useCreateBulkAssetActionMutation(
    {}
  );
  const { handleSubmit } = useCustomMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      newOwnerId: undefined,
      transferDate: undefined,
      transferredTo: undefined,
      comments: undefined,
    },
    validationSchema: assetTransferSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const createAssetBulkActionDto = {
        bulkActionTypeId: ASSET_BULK_ACTION_TYPE.ASSET_TRANSFER,
        newOwnerId: values?.newOwnerId!,
        transferredTo: values?.transferredTo!,
        comments: values?.comments!,
        actionDate: moment(values.transferDate, 'DD/MM/YYYY')
          .utcOffset(0, true)
          .toISOString(),
        initiatedBy: values.newOwnerId!,
        requestedBy: session?.user.userId!,
        createdBy: session?.user.username!,
      };
      // const uploadedDocuments: Document[] = values.documents.filter(
      //   (item: Document) => item.documentId === null
      // );

      // const existingDocuments: Document[] = values.documents.filter(
      //   (item: Document) => item.documentId !== null
      // );
      // const createAssetDocumentsDto =
      //   uploadedDocuments.length > 0
      //     ? uploadedDocuments.map((item) => ({
      //         documentName: item.documentName ?? undefined,
      //         base64Document: item.base64Document ?? undefined,
      //         createdBy: session?.user?.username,
      //       }))
      //     : null;

      // const assetDocumentIds =
      //   existingDocuments.length > 0
      //     ? existingDocuments
      //         .filter((item) => item.documentId !== null)
      //         .map((item) => item.documentId as number)
      //     : null;

      const finalPayload = {
        createAssetBulkActionDto,
        createAssetDocumentsDto: null,
        assetDocumentIds: null,
        assetIds: getSelectedAssetIds(),
      };
      const resp = await handleSubmit(createBulkAction, finalPayload, '');
      if (resp?.data) {
        removeSelectedAssetIds();
        onOpen();
      }
    },
  });

  const handleClose = () => {
    removeSelectedAssetIds();
    onClose();
    router.push(`/${ROUTES.ASSETS}`);
  };

  useEffect(() => {
    if (assetsInWorkFlow.length > 0 && hasWorkflow) {
      onOpenInfo();
    }
  }, [assetsInWorkFlow]);

  return (
    <Flex width="full" direction="column" pb="24px">
      <Flex px={{ base: '16px', md: 0 }}>
        <PageHeader>Bulk Asset Transfer Request</PageHeader>
      </Flex>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
            <Flex
              width="full"
              py="32px"
              px={{ base: '16px', md: '25px' }}
              direction="column"
              gap={{ base: '28px', md: '31px' }}
              rounded={{ md: '6px' }}
              bgColor="white"
              minH="70vh"
            >
              <BulkAssetTable type="transfer" />
              <SectionTwo />
            </Flex>
            <HStack
              spacing="16px"
              justifyContent={{ base: 'space-between', md: 'flex-end' }}
              width="full"
              px={{ base: '16px', md: 0 }}
            >
              <Button
                type="button"
                customStyles={{ width: '96px', bgColor: '#F6F6F6B2' }}
                variant="secondary"
                handleClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={formik.isSubmitting || isLoading}
                isDisabled={getSelectedAssetIds().length < 1}
              >
                Bulk Transfer
              </Button>
            </HStack>
          </Flex>
        </form>
      </FormikProvider>

      {isOpen && (
        <AssetSuccessModal
          isOpen={isOpen}
          onClose={onClose}
          buttonWidth="193px"
          successText="Bulk Asset Transfer Request Successful"
        />
      )}
      <TransferDisposalInProgressModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        assetIds={assetsInWorkFlow}
      />
      <ApprovalWorkflowWarning
        type="transfer"
        isBulk={true}
        hasWorkflow={hasWorkflow}
      />
    </Flex>
  );
};

export default BulkTransfer;

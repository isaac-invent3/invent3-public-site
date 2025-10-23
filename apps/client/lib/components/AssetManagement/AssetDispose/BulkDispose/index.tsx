'use client';

import { useAppFormik } from '~/lib/hooks/useAppFormik';

import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FormikProvider } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import moment from 'moment';
import AssetSuccessModal from '../../Modals/AssetSuccessModal';
import BulkAssetTable from '../../Common/BulkAssetTable';
import { Button } from '@repo/ui/components';
import SectionTwo from './SectionTwo';
import { assetDisposeSchema } from '~/lib/schemas/asset/main.schema';
import {
  getSelectedAssetIds,
  removeSelectedAssetIds,
} from '../../Common/utils';
import PageHeader from '~/lib/components/UI/PageHeader';
import { ASSET_BULK_ACTION_TYPE, ROUTES } from '~/lib/utils/constants';
import { useRouter } from 'next/navigation';
import { Document } from '~/lib/interfaces/general.interfaces';
import { useCreateBulkAssetActionMutation } from '~/lib/redux/services/asset/bulkAction.services';
import ApprovalWorkflowWarning from '../../Common/ApprovalWorkflowWarning';
import TransferDisposalInProgressModal from '../../Modals/TransferDisposalInProgressModal';

interface BulkDisposeProps {
  assetsInWorkFlow: number[];
  hasWorkflow: boolean;
}
const BulkDispose = (props: BulkDisposeProps) => {
  const { assetsInWorkFlow, hasWorkflow } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const [createBulkAction, { isLoading }] = useCreateBulkAssetActionMutation(
    {}
  );
  const router = useRouter();
  const { handleSubmit } = useCustomMutation();
  const formik = useAppFormik({
    initialValues: {
      disposalDate: '',
      disposalReasonId: undefined,
      comments: undefined,
      documents: [],
    },
    validationSchema: assetDisposeSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const createAssetBulkActionDto = {
        bulkActionTypeId: ASSET_BULK_ACTION_TYPE.ASSET_DISPOSAL,
        disposalReasonId: values.disposalReasonId!,
        comments: values.comments!,
        actionDate: moment(values.disposalDate, 'DD/MM/YYYY')
          .utc()
          .toISOString()!,
        disposalRequestedBy: session?.user?.userId!,
        requestedBy: session?.user.userId!,
        createdBy: session?.user?.username!,
      };
      const uploadedDocuments: Document[] = values.documents.filter(
        (item: Document) => item.documentId === null
      );

      const existingDocuments: Document[] = values.documents.filter(
        (item: Document) => item.documentId !== null
      );
      const createAssetDocumentsDto =
        uploadedDocuments.length > 0
          ? uploadedDocuments.map((item) => ({
              documentName: item.documentName ?? undefined,
              base64Document: item.base64Document ?? undefined,
              createdBy: session?.user?.username,
            }))
          : null;

      const assetDocumentIds =
        existingDocuments.length > 0
          ? existingDocuments
              .filter((item) => item.documentId !== null)
              .map((item) => item.documentId as number)
          : null;

      const finalPayload = {
        createAssetBulkActionDto,
        createAssetDocumentsDto,
        assetDocumentIds,
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
        <PageHeader>Bulk Asset Dispose Request</PageHeader>
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
              <BulkAssetTable type="dispose" />
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
                Bulk Dispose
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
          successText="Bulk Asset Dispose Request Successful"
        />
      )}
      <TransferDisposalInProgressModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        assetIds={assetsInWorkFlow}
      />
      <ApprovalWorkflowWarning
        type="disposal"
        isBulk={true}
        hasWorkflow={hasWorkflow}
      />
    </Flex>
  );
};

export default BulkDispose;

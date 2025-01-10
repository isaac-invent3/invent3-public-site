'use client';

import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import moment from 'moment';
import AssetSuccessModal from '../../Modals/AssetSuccessModal';
import BulkAssetTable from '../../Common/BulkAssetTable';
import { Button } from '@repo/ui/components';
import SectionTwo from './SectionTwo';
import { useRequestAssetDisposalMutation } from '~/lib/redux/services/asset/disposal.services';
import { AssetFormDocument } from '~/lib/interfaces/asset/general.interface';
import { assetDisposeSchema } from '~/lib/schemas/asset/main.schema';
import {
  getSelectedAssetIds,
  removeSelectedAssetIds,
} from '../../Common/utils';

const BulkDispose = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [requestAssetDisposal, { isLoading }] = useRequestAssetDisposalMutation(
    {}
  );
  const { handleSubmit } = useCustomMutation();
  const formik = useFormik({
    initialValues: {
      disposalDate: '',
      disposalReasonId: undefined,
      comments: undefined,
      documents: [],
    },
    validationSchema: assetDisposeSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const createBulkAssetDisposalRequestDto = {
        disposalReasonId: values.disposalReasonId!,
        comments: values.comments!,
        assetIds: getSelectedAssetIds(),
        disposalDate: moment(values.disposalDate, 'DD/MM/YYYY')
          .utcOffset(0, true)
          .toISOString()!,
        disposalRequestedBy: 1,
        createdBy: session?.user?.username!,
      };
      const uploadedDocuments: AssetFormDocument[] = values.documents.filter(
        (item: AssetFormDocument) => item.documentId === null
      );

      const existingDocuments: AssetFormDocument[] = values.documents.filter(
        (item: AssetFormDocument) => item.documentId !== null
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

      const finalQuery = {
        createBulkAssetDisposalRequestDto,
        createAssetDocumentsDto,
        assetDocumentIds,
      };
      const resp = await handleSubmit(requestAssetDisposal, finalQuery, '');
      if (resp?.data) {
        removeSelectedAssetIds();
        onOpen();
      }
    },
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <Header />
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
            <Flex
              width="full"
              py="32px"
              px="25px"
              direction="column"
              gap="47px"
              rounded="6px"
              bgColor="white"
              minH="70vh"
            >
              <BulkAssetTable type="dispose" />
              <SectionTwo />
            </Flex>
            <HStack spacing="16px" justifyContent="flex-end" width="full">
              <HStack
                as="button"
                px="16px"
                rounded="8px"
                bgColor="#F6F6F6B2"
                minH="50px"
                minW="96px"
                justifyContent="center"
              >
                <Text size="md" color="primary.500">
                  Cancel
                </Text>
              </HStack>

              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={formik.isSubmitting || isLoading}
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
    </Flex>
  );
};

export default BulkDispose;

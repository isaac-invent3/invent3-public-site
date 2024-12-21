import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Header from './Header';
import {
  Asset,
  AssetFormDocument,
} from '~/lib/interfaces/asset/general.interface';
import { FormikProvider, useFormik } from 'formik';
import { assetDisposeSchema } from '~/lib/schemas/asset/main.schema';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearAsset, setAsset } from '~/lib/redux/slices/AssetSlice';
import { Button } from '@repo/ui/components';
import AssetSuccessModal from '../Modals/AssetSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useRequestAssetDisposalMutation } from '~/lib/redux/services/asset/disposal.services';
import { getSession } from 'next-auth/react';
import moment from 'moment';

interface AssetDisposeProps {
  data: Asset;
}
const AssetDispose = (props: AssetDisposeProps) => {
  const { data } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
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
      const createAssetDisposalRequestDto = {
        disposalReasonId: values.disposalReasonId!,
        comments: values.comments!,
        assetId: data?.assetId!,
        disposalDate: moment(values.disposalDate, 'DD/MM/YYYY')
          .utcOffset(0, true)
          .toISOString()!,
        currentOwner: data?.currentOwnerId!,
        disposalRequestedBy: data?.currentOwnerId!,
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
        createAssetDisposalRequestDto,
        createAssetDocumentsDto,
        assetDocumentIds,
      };
      const resp = await handleSubmit(requestAssetDisposal, finalQuery, '');
      if (resp?.data) {
        onOpen();
      }
    },
  });

  useEffect(() => {
    dispatch(setAsset(data));

    return () => {
      dispatch(clearAsset());
    };
  }, [data]);

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
              gap="40px"
              rounded="6px"
              bgColor="white"
              minH="70vh"
            >
              <SectionOne />
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
                Dispose
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
          headingText="Dispose Request Submitted"
          successText="Your request to dispose has been submitted and would be reviewed by the appropriate user"
        />
      )}
    </Flex>
  );
};

export default AssetDispose;

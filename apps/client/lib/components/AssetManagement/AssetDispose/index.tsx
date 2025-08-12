import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
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
import PageHeader from '../../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import { Document } from '~/lib/interfaces/general.interfaces';
import TransferDisposalInProgressModal from '../Modals/TransferDisposalInProgressModal';
import ApprovalWorkflowWarning from '../Common/ApprovalWorkflowWarning';

interface AssetDisposeProps {
  data: Asset;
  inAWorkflow: boolean;
  hasWorkflow: boolean;
}
const AssetDispose = (props: AssetDisposeProps) => {
  const { data, inAWorkflow, hasWorkflow } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
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
        assetIds: [data?.assetId],
        disposalDate: moment(values.disposalDate, 'DD/MM/YYYY')
          .utc()
          .toISOString()!,
        disposalRequestedBy: data?.currentOwnerId!,
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

      const finalQuery = {
        createBulkAssetDisposalRequestDto: createAssetDisposalRequestDto,
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

  useEffect(() => {
    if (hasWorkflow && inAWorkflow) {
      onOpenInfo();
    }
  }, [inAWorkflow]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <Flex px={{ base: '16px', md: 0 }}>
          <PageHeader>Asset Dispose Request</PageHeader>
        </Flex>
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <Flex width="full" direction="column" gap="24px" mt="32px">
              <Flex
                width="full"
                py="32px"
                px={{ base: '16px', md: '25px' }}
                direction="column"
                gap={{ base: '28px', md: '40px' }}
                rounded={{ md: '6px' }}
                bgColor="white"
                minH="70vh"
              >
                <SectionOne />
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
                  href={`/${ROUTES.ASSETS}`}
                >
                  Cancel
                </Button>
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
      <TransferDisposalInProgressModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
      />
      <ApprovalWorkflowWarning
        type="disposal"
        isBulk={false}
        hasWorkflow={hasWorkflow}
      />
    </>
  );
};

export default AssetDispose;

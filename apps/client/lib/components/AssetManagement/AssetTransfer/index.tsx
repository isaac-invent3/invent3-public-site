import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import { FormikProvider, useFormik } from 'formik';
import { assetTransferSchema } from '~/lib/schemas/asset/main.schema';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearAsset, setAsset } from '~/lib/redux/slices/AssetSlice';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { Button } from '@repo/ui/components';
import AssetSuccessModal from '../Modals/AssetSuccessModal';
import moment from 'moment';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import PageHeader from '../../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import { useTransferAssetMutation } from '~/lib/redux/services/asset/transfer.services';
import TransferDisposalInProgressModal from '../Modals/TransferDisposalInProgressModal';

interface AssetTransferProps {
  data: Asset;
  inAWorkflow: boolean;
}
const AssetTransfer = (props: AssetTransferProps) => {
  const { data, inAWorkflow } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();
  const dispatch = useAppDispatch();
  const [transferAsset, { isLoading }] = useTransferAssetMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      newOwnerId: undefined,
      transferDate: undefined,
      transferredTo: undefined,
      comments: null,
    },
    validationSchema: assetTransferSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const formValues = {
        newOwnerId: values?.newOwnerId!,
        transferredTo: values?.transferredTo!,
        comments: values?.comments!,
        assetId: data?.assetId,
        transferDate: moment(values.transferDate, 'DD/MM/YYYY')
          .utcOffset(0, true)
          .toISOString(),
        initiatedBy: Number(session?.user?.userId)!,
        createdBy: session?.user.username!,
      };
      const resp = await handleSubmit(transferAsset, formValues, '');
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
    if (inAWorkflow) {
      onOpenInfo();
    }
  }, [inAWorkflow]);

  return (
    <>
      <Flex width="full" direction="column" pb="24px">
        <Flex px={{ base: '16px', md: 0 }}>
          <PageHeader>Asset Transfer Request</PageHeader>
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
                  Transfer
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
            successText="Asset Transfer Request Successful"
          />
        )}
      </Flex>
      <TransferDisposalInProgressModal
        isOpen={isOpenInfo}
        onClose={onCloseInfo}
        type="transfer"
      />
    </>
  );
};

export default AssetTransfer;

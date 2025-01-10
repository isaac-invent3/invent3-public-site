'use client';

import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Header from './Header';
import { FormikProvider, useFormik } from 'formik';
import { assetTransferSchema } from '~/lib/schemas/asset/main.schema';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useTransferAssetMutation } from '~/lib/redux/services/asset/general.services';
import moment from 'moment';
import AssetSuccessModal from '../../Modals/AssetSuccessModal';
import SectionTwo from '../SectionTwo';
import BulkAssetTable from '../../Common/BulkAssetTable';
import { Button } from '@repo/ui/components';
import {
  getSelectedAssetIds,
  removeSelectedAssetIds,
} from '../../Common/utils';

const BulkTransfer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transferAsset, { isLoading }] = useTransferAssetMutation({});
  const { handleSubmit } = useCustomMutation();
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
      const formValues = {
        newOwnerId: values?.newOwnerId!,
        transferredTo: values?.transferredTo!,
        comments: values?.comments!,
        assetIds: getSelectedAssetIds(),
        transferDate: moment(values.transferDate, 'DD/MM/YYYY')
          .utcOffset(0, true)
          .toISOString(),
        initiatedBy: values.newOwnerId!,
        createdBy: session?.user.username!,
      };
      const resp = await handleSubmit(transferAsset, formValues, '');
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
              gap="31px"
              rounded="6px"
              bgColor="white"
              minH="70vh"
            >
              <BulkAssetTable type="transfer" />
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
    </Flex>
  );
};

export default BulkTransfer;

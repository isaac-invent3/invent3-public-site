import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  Heading,
  HStack,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider } from 'formik';
import { Button, GenericModal } from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import StatusSuccessModal from './SuccessModal';
import {
  useGetAllNonSystemAssetStatusQuery,
  useSearchStatusMutation,
  useUpdateAssetStatusMutation,
} from '~/lib/redux/services/asset/general.services';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { bulkStatusActionSchema } from '~/lib/schemas/asset/main.schema';
import { updateSelectedAssetIds } from '~/lib/redux/slices/AssetSlice';

interface ChangeAssetStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ChangeAssetStatusModal = (props: ChangeAssetStatusModalProps) => {
  const { isOpen, onClose } = props;
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [updateAssetStatus, { isLoading: isUpdating }] =
    useUpdateAssetStatusMutation({});
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllNonSystemAssetStatusQuery(
    {
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    { skip: !isOpen }
  );
  const [searchStatus] = useSearchStatusMutation();
  const selectedAssetIds = useAppSelector(
    (state) => state.asset.selectedAssetIds
  );
  const dispatch = useAppDispatch();

  const formik = useAppFormik({
    initialValues: {
      statusId: undefined,
      assetIds: selectedAssetIds,
    },
    validationSchema: bulkStatusActionSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      let response;
      const info = {
        assetIds: values.assetIds,
        statusId: values.statusId!,
        lastModifiedBy: session?.user.username!,
      };
      response = await handleSubmit(updateAssetStatus, info, '');
      if (response?.data) {
        onOpenSuccess();
      }
    },
  });

  const handleCloseSuccessModal = () => {
    dispatch(updateSelectedAssetIds([]));
    onCloseSuccess();
    onClose();
  };

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px="32px"
                pt="56px"
                pb="34px"
                spacing="48px"
                alignItems="center"
              >
                <VStack spacing="8px">
                  <Heading fontWeight={800} size="xl" color="primary.500">
                    Change Status
                  </Heading>
                  <Text color="neutral.700" size="md">
                    Kindly select the status you want to update the Asset(s) to
                  </Text>
                </VStack>

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="24px">
                  <GenericAsyncSelect
                    selectName="statusId"
                    selectTitle="Status"
                    data={data}
                    labelKey="statusName"
                    valueKey="statusId"
                    mutationFn={undefined}
                    isLoading={isLoading || isFetching}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    isSearchable={false}
                  />
                </VStack>
                {/* Main Form Ends Here */}
                <HStack width="full" spacing="24px" justifyContent="center">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '96px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    customStyles={{ width: '193px' }}
                    isLoading={isUpdating || formik.isSubmitting}
                  >
                    Continue
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormikProvider>
        </ModalBody>
      </GenericModal>

      <StatusSuccessModal
        isOpen={isOpenSuccess}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
};

export default ChangeAssetStatusModal;

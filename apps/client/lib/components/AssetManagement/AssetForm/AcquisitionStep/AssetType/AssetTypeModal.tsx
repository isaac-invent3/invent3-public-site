/* eslint-disable no-unused-vars */
import { Field, FormikProvider, useField, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateAssetForm } from '~/lib/redux/slices/AssetSlice';
import { useCreateAssetTypeMutation } from '~/lib/redux/services/asset/types.services';
import { typeSchema } from '~/lib/schemas/asset/type.schema';
import { HStack, ModalBody, VStack } from '@chakra-ui/react';

interface AssetTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AssetTypeModal = (props: AssetTypeModalProps) => {
  const { isOpen, onClose } = props;
  const [createAssetType, { isLoading }] = useCreateAssetTypeMutation({});
  const { handleSubmit } = useCustomMutation();
  const [field, meta, helpers] = useField('assetTypeId');
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      typeName: '',
    },
    validationSchema: typeSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(createAssetType, finalValue, '');
      if (response?.data) {
        helpers.setValue(response?.data?.data?.assetTypeId);
        dispatch(
          updateAssetForm({
            assetTypeName: response?.data?.data?.typeName!,
          })
        );
        onClose();
      }
    },
  });

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{ width: { sm: '450px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '40px' }}
            >
              <ModalHeading
                heading="Add New Asset Type"
                subheading="Add a new asset type that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <Field
                  as={FormTextInput}
                  name="typeName"
                  type="text"
                  label="Asset Type Name"
                />
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px">
                <Button
                  variant="secondary"
                  customStyles={{ width: '96px' }}
                  handleClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Asset Type
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default AssetTypeModal;

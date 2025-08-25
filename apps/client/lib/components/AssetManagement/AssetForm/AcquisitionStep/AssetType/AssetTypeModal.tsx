/* eslint-disable no-unused-vars */
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import { typeSchema } from '~/lib/schemas/asset/type.schema';
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { AssetTypePayload } from '~/lib/interfaces/asset/type.interface';

interface AssetTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAdd: (payload: AssetTypePayload) => Promise<void>;
}
const AssetTypeModal = (props: AssetTypeModalProps) => {
  const { isOpen, onClose, handleAdd } = props;

  const formik = useFormik({
    initialValues: {
      typeName: '',
    },
    validationSchema: typeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username ?? '',
      };
      setSubmitting(true);
      await handleAdd(finalValue);
      setSubmitting(false);
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
                <Button type="submit" isLoading={formik.isSubmitting}>
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

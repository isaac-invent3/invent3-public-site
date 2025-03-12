/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateShelfMutation } from '~/lib/redux/services/location/shelf.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { shelfSchema } from '~/lib/schemas/asset/location.schema';
import AisleSelect from './SelectInputs/AisleSelect';

interface ShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAisleId: number | null;
}
const ShelfModal = (props: ShelfModalProps) => {
  const { isOpen, onClose, defaultAisleId } = props;
  const [createShelf, { isLoading }] = useCreateShelfMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      aisleId: defaultAisleId ?? undefined,
      shelfName: '',
      shelfRef: '',
    },
    validationSchema: shelfSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createShelf, finalValue, '');
      if (response?.data) {
        onClose();
        resetForm();
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
                heading="Add New Shelf"
                subheading="Add a new shelf that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <AisleSelect type="general" />
                <Field
                  as={FormTextInput}
                  name="shelfName"
                  type="text"
                  label="Shelf Name"
                />
                <Field
                  as={FormTextInput}
                  name="shelfRef"
                  type="text"
                  label="Shelf Reference"
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
                  Add Shelf
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default ShelfModal;

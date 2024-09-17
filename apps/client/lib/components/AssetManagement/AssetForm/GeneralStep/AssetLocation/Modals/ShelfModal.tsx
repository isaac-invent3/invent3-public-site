/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from './ModalHeading';
import { useCreateShelfMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { shelfSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import AisleSelect from './SelectInputs/AisleSelect';

interface ShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ShelfModal = (props: ShelfModalProps) => {
  const { isOpen, onClose } = props;
  const [createShelf, { isLoading }] = useCreateShelfMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      aisleId: null,
      shelfName: null,
      shelfRef: null,
    },
    validationSchema: shelfSchema,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createShelf, finalValue, '');
      if (response?.data) {
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
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack width="full" spacing="32px" p="40px">
            <ModalHeading
              heading="Add New Shelf"
              subheading="Add a new shelf that is not on the system yet"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <AisleSelect />
              <Field
                as={TextInput}
                name="shelfName"
                type="text"
                label="Shelf Name"
              />
              <Field
                as={TextInput}
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
              <Button type="submit" isLoading={isLoading}>
                Add Shelf
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default ShelfModal;

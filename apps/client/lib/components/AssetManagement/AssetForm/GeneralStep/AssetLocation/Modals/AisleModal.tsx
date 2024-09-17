/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '../../../../../UI/ModalHeading';
import { useCreateAisleMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { aisleSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import RoomSelect from './SelectInputs/RoomSelect';

interface AisleModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AisleModal = (props: AisleModalProps) => {
  const { isOpen, onClose } = props;
  const [createAisle, { isLoading }] = useCreateAisleMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      roomId: null,
      aisleName: null,
      aisleRef: null,
    },
    validationSchema: aisleSchema,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createAisle, finalValue, '');
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
              heading="Add New Aisle"
              subheading="Add a new aisle that is not on the system yet"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <RoomSelect />
              <Field
                as={TextInput}
                name="aisleName"
                type="text"
                label="Aisle Name"
              />
              <Field
                as={TextInput}
                name="aisleRef"
                type="text"
                label="Aisle Reference"
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
                Add Aisle
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default AisleModal;

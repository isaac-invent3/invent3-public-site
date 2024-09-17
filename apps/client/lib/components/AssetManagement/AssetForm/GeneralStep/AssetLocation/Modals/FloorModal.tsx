/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '../../../../../UI/ModalHeading';
import { useCreateFloorMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { floorSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import BuildingSelect from './SelectInputs/BuildingSelect';

interface FloorModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const FloorModal = (props: FloorModalProps) => {
  const { isOpen, onClose } = props;
  const [createFloor, { isLoading }] = useCreateFloorMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      buildingId: null,
      floorName: null,
      floorRef: null,
    },
    validationSchema: floorSchema,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createFloor, finalValue, '');
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
              heading="Add New Floor"
              subheading="Add a new floor that is not on the system yet"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <BuildingSelect />
              <Field
                as={TextInput}
                name="floorName"
                type="text"
                label="Floor Name"
              />
              <Field
                as={TextInput}
                name="floorRef"
                type="text"
                label="Floor Reference"
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
                Add Floor
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default FloorModal;

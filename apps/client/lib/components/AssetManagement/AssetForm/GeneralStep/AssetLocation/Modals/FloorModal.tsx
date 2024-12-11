/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import { Button } from '@repo/ui/components';
import ModalHeading from '../../../../../UI/Modal/ModalHeading';
import { useCreateFloorMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { floorSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import BuildingSelect from './SelectInputs/BuildingSelect';

interface FloorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBuildingId: number | null;
}
const FloorModal = (props: FloorModalProps) => {
  const { isOpen, onClose, defaultBuildingId } = props;
  const [createFloor, { isLoading }] = useCreateFloorMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      buildingId: defaultBuildingId ?? null,
      floorName: null,
      floorRef: null,
    },
    validationSchema: floorSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createFloor, finalValue, '');
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
            <VStack width="full" spacing="32px" p="40px">
              <ModalHeading
                heading="Add New Floor"
                subheading="Add a new floor that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <BuildingSelect type="general" />
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
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Floor
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default FloorModal;

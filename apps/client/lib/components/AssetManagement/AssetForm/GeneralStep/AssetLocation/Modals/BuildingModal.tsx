/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from './ModalHeading';
import { useCreateBuildingMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { buildingSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import FacilitySelect from './SelectInputs/FacilitySelect';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const BuildingModal = (props: BuildingModalProps) => {
  const { isOpen, onClose } = props;
  const [createBuilding, { isLoading }] = useCreateBuildingMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      facilityId: null,
      buildingName: null,
      buildingRef: null,
      address: null,
      longitude: 0,
      latitude: 0,
    },
    validationSchema: buildingSchema,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createBuilding, finalValue, '');
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
              heading="Add New Building"
              subheading="Add a new building that is not on the system yet"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <FacilitySelect />
              <Field
                as={TextInput}
                name="buildingName"
                type="text"
                label="Building Name"
              />
              <Field
                as={TextInput}
                name="buildingRef"
                type="text"
                label="Building Reference"
              />
              <Field
                as={TextInput}
                name="address"
                type="text"
                label="Address"
              />
              <Field
                as={TextInput}
                name="longitude"
                type="number"
                label="Longitude"
              />
              <Field
                as={TextInput}
                name="latitude"
                type="number"
                label="Latitude"
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
                Add Building
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default BuildingModal;

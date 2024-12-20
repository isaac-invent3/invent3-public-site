/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateBuildingMutation } from '~/lib/redux/services/location/building.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { buildingSchema } from '~/lib/schemas/asset/location.schema';
import FacilitySelect from './SelectInputs/FacilitySelect';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFacilityId: number | null;
}
const BuildingModal = (props: BuildingModalProps) => {
  const { isOpen, onClose, defaultFacilityId } = props;
  const [createBuilding, { isLoading }] = useCreateBuildingMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      facilityId: defaultFacilityId ?? undefined,
      buildingName: '',
      buildingRef: '',
      address: '',
      longitude: 0,
      latitude: 0,
    },
    validationSchema: buildingSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(createBuilding, finalValue, '');
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
                heading="Add New Building"
                subheading="Add a new building that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FacilitySelect type="general" />
                <Field
                  as={FormTextInput}
                  name="buildingName"
                  type="text"
                  label="Building Name"
                />
                <Field
                  as={FormTextInput}
                  name="buildingRef"
                  type="text"
                  label="Building Reference"
                />
                <Field
                  as={FormTextInput}
                  name="address"
                  type="text"
                  label="Address"
                />
                <Field
                  as={FormTextInput}
                  name="longitude"
                  type="number"
                  label="Longitude"
                />
                <Field
                  as={FormTextInput}
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
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Building
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default BuildingModal;

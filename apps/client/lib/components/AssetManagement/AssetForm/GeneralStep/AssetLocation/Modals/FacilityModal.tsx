/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateFacilityMutation } from '~/lib/redux/services/location/facility.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { facilitySchema } from '~/lib/schemas/asset/location.schema';
import LGASelect from '../LGASelect';
import { getSession } from 'next-auth/react';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLGAId: number | null;
}
const FacilityModal = (props: FacilityModalProps) => {
  const { isOpen, onClose, defaultLGAId } = props;
  const [createFacility, { isLoading }] = useCreateFacilityMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      lgaId: defaultLGAId ?? undefined,
      facilityName: '',
      facilityRef: '',
      address: '',
      longitude: 0,
      latitude: 0,
    },
    validationSchema: facilitySchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createFacility, finalValue, '');
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
                heading="Add New Facility"
                subheading="Add a new facility that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <LGASelect type="general" />
                <Field
                  as={FormTextInput}
                  name="facilityName"
                  type="text"
                  label="Facility Name"
                />
                <Field
                  as={FormTextInput}
                  name="facilityRef"
                  type="text"
                  label="Facility Reference"
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
                  Add Facility
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default FacilityModal;

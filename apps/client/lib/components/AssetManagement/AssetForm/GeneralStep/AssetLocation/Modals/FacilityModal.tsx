/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '../../../../../UI/Modal/ModalHeading';
import { useCreateFacilityMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { facilitySchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import LGASelect from '../LGASelect';

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLGAId: number | null;
}
const FacilityModal = (props: FacilityModalProps) => {
  const { isOpen, onClose, defaultLGAId } = props;
  const [createFacility, { isLoading }] = useCreateFacilityMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      lgaId: defaultLGAId ?? null,
      facilityName: null,
      facilityRef: null,
      address: null,
      longitude: 0,
      latitude: 0,
    },
    validationSchema: facilitySchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
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
                  as={TextInput}
                  name="facilityName"
                  type="text"
                  label="Facility Name"
                />
                <Field
                  as={TextInput}
                  name="facilityRef"
                  type="text"
                  label="Facility Reference"
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

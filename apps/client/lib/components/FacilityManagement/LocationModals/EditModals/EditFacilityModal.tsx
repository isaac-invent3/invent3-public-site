import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useUpdateFacilityMutation } from '~/lib/redux/services/location/facility.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { facilitySchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Facility } from '~/lib/interfaces/location.interfaces';

interface EditFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess: () => void;
  data: Facility;
  showSuccessMessage?: boolean;
}
const EditFacilityModal = (props: EditFacilityModalProps) => {
  const { isOpen, onClose, data, showSuccessMessage, handleSuccess } = props;
  const [updateFacility, { isLoading }] = useUpdateFacilityMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      lgaId: data?.lgaid,
      facilityName: data?.facilityName!,
      facilityRef: data?.facilityRef!,
      address: data?.address,
      longitude: data?.longitude,
      latitude: data?.latitude,
    },
    validationSchema: facilitySchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        facilityId: data.facilityId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(
        updateFacility,
        finalValue,
        showSuccessMessage ? 'Facility Updated Successfully' : ''
      );
      if (response?.data) {
        resetForm();
        handleSuccess();
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
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              spacing="32px"
              py={{ base: '24px', md: '40px' }}
              px="20px"
            >
              <ModalHeading
                heading="Edit Facility"
                subheading="Edit Facility Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Name"
                  description="Input Facility name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="facilityName"
                    type="text"
                    label="Facility Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Ref"
                  description="Input Facility ref."
                >
                  <Field
                    as={FormTextInput}
                    name="facilityRef"
                    type="text"
                    label="Facility Reference"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Address"
                  description="Input Facility Address"
                >
                  <Field
                    as={FormTextInput}
                    name="address"
                    type="text"
                    label="Address"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Longitude"
                  description="Input Facility Longitude"
                >
                  <Field
                    as={FormTextInput}
                    name="longitude"
                    type="number"
                    label="Longitude"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Facility Latitude"
                  description="Input Facility Latitude"
                >
                  <Field
                    as={FormTextInput}
                    name="latitude"
                    type="number"
                    label="Latitude"
                  />
                </FormInputWrapper>
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
                  Save
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default EditFacilityModal;

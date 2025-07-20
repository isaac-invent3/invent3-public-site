/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField, useFormik } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateBuildingMutation } from '~/lib/redux/services/location/building.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { buildingSchema } from '~/lib/schemas/asset/location.schema';
import FacilitySelect from './SelectInputs/FacilitySelect';
import React from 'react';
import {
  BuildingFormData,
  FormLocation,
} from '~/lib/interfaces/location.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { Option } from '@repo/interfaces';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFacilityId: number | null;
  children?: React.ReactNode;
  handleSave?: (data: BuildingFormData) => void;
  showDropdown?: boolean;
  showToast?: boolean;
  handleReadableLocation?: (option: Option, key: keyof FormLocation) => void;
}
const BuildingModal = (props: BuildingModalProps) => {
  const {
    isOpen,
    onClose,
    defaultFacilityId,
    children,
    handleSave,
    showDropdown = true,
    showToast,
    handleReadableLocation,
  } = props;
  const [createBuilding, { isLoading }] = useCreateBuildingMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      facilityId: (defaultFacilityId ?? undefined)!,
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
      if (handleSave) {
        handleSave(finalValue);
        resetForm();
      } else {
        const response = await handleSubmit(
          createBuilding,
          finalValue,
          showToast ? 'Building Created Successfully' : ''
        );
        if (response?.data) {
          if (handleReadableLocation) {
            handleReadableLocation(
              {
                label: response?.data?.data?.buildingName,
                value: response?.data?.data?.buildingId,
              },
              'building'
            );
          }
          onClose();
          resetForm();
        }
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
                heading="Add New Building"
                subheading="Add a new building that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                {children ??
                  (showDropdown && (
                    <FormInputWrapper
                      sectionMaxWidth="141px"
                      customSpacing="16px"
                      title="Facility"
                      isRequired
                      description="Select Facility"
                    >
                      <FacilitySelect type="general" />
                    </FormInputWrapper>
                  ))}
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Building Name"
                  description="Input Building name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="buildingName"
                    type="text"
                    label="Building Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Building Ref"
                  description="Input Building ref."
                >
                  <Field
                    as={FormTextInput}
                    name="buildingRef"
                    type="text"
                    label="Building Reference"
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

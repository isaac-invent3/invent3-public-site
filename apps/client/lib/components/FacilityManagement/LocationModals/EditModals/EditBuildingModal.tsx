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
import { useUpdateBuildingMutation } from '~/lib/redux/services/location/building.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { buildingSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Building } from '~/lib/interfaces/location.interfaces';

interface EditBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Building;
}
const EditBuildingModal = (props: EditBuildingModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateBuilding, { isLoading }] = useUpdateBuildingMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      facilityId: data?.facilityId,
      buildingName: data?.buildingName!,
      buildingRef: data?.buildingRef!,
      address: data?.address,
      longitude: data?.longitude,
      latitude: data?.latitude,
    },
    validationSchema: buildingSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        buildingId: data.buildingId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateBuilding, finalValue, '');
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
            <VStack
              width="full"
              spacing="32px"
              py={{ base: '24px', md: '40px' }}
              px="20px"
            >
              <ModalHeading
                heading="Edit Building"
                subheading="Edit building Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
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

export default EditBuildingModal;

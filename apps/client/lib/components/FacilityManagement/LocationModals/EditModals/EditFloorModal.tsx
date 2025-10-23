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
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { floorSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Floor } from '~/lib/interfaces/location.interfaces';
import { useUpdateFloorMutation } from '~/lib/redux/services/location/floor.services';

interface EditFloorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Floor;
}
const EditFloorModal = (props: EditFloorModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateFloor, { isLoading }] = useUpdateFloorMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      buildingId: data?.buildingId,
      floorName: data?.floorName!,
      floorRef: data?.floorRef!,
    },
    validationSchema: floorSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        floorId: data.floorId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateFloor, finalValue, '');
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
                heading="Edit Floor"
                subheading="Edit Floor Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Floor Name"
                  description="Input Floor name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="floorName"
                    type="text"
                    label="Floor Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Floor Ref"
                  description="Input Floor ref."
                >
                  <Field
                    as={FormTextInput}
                    name="floorRef"
                    type="text"
                    label="Floor Reference"
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

export default EditFloorModal;

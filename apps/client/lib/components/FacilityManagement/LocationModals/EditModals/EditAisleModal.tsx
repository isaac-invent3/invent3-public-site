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
import { aisleSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Aisle } from '~/lib/interfaces/location.interfaces';
import { useUpdateAisleMutation } from '~/lib/redux/services/location/aisle.services';

interface EditAisleModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Aisle;
}
const EditAisleModal = (props: EditAisleModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateAisle, { isLoading }] = useUpdateAisleMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      roomId: data?.roomId,
      aisleName: data?.aisleName!,
      aisleRef: data?.aisleRef!,
    },
    validationSchema: aisleSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        aisleId: data.aisleId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateAisle, finalValue, '');
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
                heading="Edit Aisle"
                subheading="Edit Aisle Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Aisle Name"
                  description="Input Aisle name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="aisleName"
                    type="text"
                    label="Aisle Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Aisle Ref"
                  description="Input Aisle ref."
                >
                  <Field
                    as={FormTextInput}
                    name="aisleRef"
                    type="text"
                    label="Aisle Reference"
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

export default EditAisleModal;

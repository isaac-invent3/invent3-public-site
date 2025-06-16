/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { shelfSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Shelf } from '~/lib/interfaces/location.interfaces';
import { useUpdateShelfMutation } from '~/lib/redux/services/location/shelf.services';

interface EditShelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Shelf;
}
const EditShelfModal = (props: EditShelfModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateShelf, { isLoading }] = useUpdateShelfMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      aisleId: data?.aisleId,
      shelfName: data?.shelfName!,
      shelfRef: data?.shelfRef!,
    },
    validationSchema: shelfSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        shelfId: data.shelfId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateShelf, finalValue, '');
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
                heading="Edit Shelf"
                subheading="Edit Shelf Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Shelf Name"
                  description="Input Shelf name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="shelfName"
                    type="text"
                    label="Shelf Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Shelf Ref"
                  description="Input Shelf ref."
                >
                  <Field
                    as={FormTextInput}
                    name="shelfRef"
                    type="text"
                    label="Shelf Reference"
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

export default EditShelfModal;

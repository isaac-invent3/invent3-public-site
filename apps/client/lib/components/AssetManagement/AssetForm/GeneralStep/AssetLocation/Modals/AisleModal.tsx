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
import { useCreateAisleMutation } from '~/lib/redux/services/location/aisle.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { aisleSchema } from '~/lib/schemas/asset/location.schema';
import RoomSelect from './SelectInputs/RoomSelect';

interface AisleModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRoomId: number | null;
}
const AisleModal = (props: AisleModalProps) => {
  const { isOpen, onClose, defaultRoomId } = props;
  const [createAisle, { isLoading }] = useCreateAisleMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      roomId: defaultRoomId ?? undefined,
      aisleName: '',
      aisleRef: '',
    },
    validationSchema: aisleSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        createdBy: session?.user?.username,
      };
      const response = await handleSubmit(createAisle, finalValue, '');
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
                heading="Add New Aisle"
                subheading="Add a new aisle that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Room"
                  description="Select Room"
                  isRequired
                >
                  <RoomSelect type="general" />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Aisle Name"
                  description="Input Aisle Name"
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
                  title="Aisle Reference"
                  description="Input Aisle Reference"
                  isRequired
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
                  Add Aisle
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default AisleModal;

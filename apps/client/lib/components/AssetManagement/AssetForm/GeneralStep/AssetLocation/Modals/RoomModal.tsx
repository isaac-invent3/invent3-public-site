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
import { useCreateRoomMutation } from '~/lib/redux/services/location/room.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { roomSchema } from '~/lib/schemas/asset/location.schema';
import DepartmentSelect from './SelectInputs/DepartmentSelect';
import { getSession } from 'next-auth/react';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartmentId: number | null;
}
const RoomModal = (props: RoomModalProps) => {
  const { isOpen, onClose, defaultDepartmentId } = props;
  const [createRoom, { isLoading }] = useCreateRoomMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      departmentId: defaultDepartmentId ?? undefined,
      roomName: '',
      roomRef: '',
    },
    validationSchema: roomSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createRoom, finalValue, '');
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
                heading="Add New Room"
                subheading="Add a new room that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Department"
                  description="Select Department"
                  isRequired
                >
                  <DepartmentSelect type="general" />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Room Name"
                  description="Input Room name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="roomName"
                    type="text"
                    label="Room Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Room Reference"
                  description="Input Room Reference"
                >
                  <Field
                    as={FormTextInput}
                    name="roomRef"
                    type="text"
                    label="Room Reference"
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
                  Add Room
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default RoomModal;

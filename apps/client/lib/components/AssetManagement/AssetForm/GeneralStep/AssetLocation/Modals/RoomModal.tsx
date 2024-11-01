/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '../../../../../UI/Modal/ModalHeading';
import { useCreateRoomMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { roomSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import DepartmentSelect from './SelectInputs/DepartmentSelect';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDepartmentId: number | null;
}
const RoomModal = (props: RoomModalProps) => {
  const { isOpen, onClose, defaultDepartmentId } = props;
  const [createRoom, { isLoading }] = useCreateRoomMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      departmentId: defaultDepartmentId ?? null,
      roomName: null,
      roomRef: null,
    },
    validationSchema: roomSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createRoom, finalValue, '');
      if (response?.data) {
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
            <VStack width="full" spacing="32px" p="40px">
              <ModalHeading
                heading="Add New Room"
                subheading="Add a new room that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <DepartmentSelect type="general" />
                <Field
                  as={TextInput}
                  name="roomName"
                  type="text"
                  label="Room Name"
                />
                <Field
                  as={TextInput}
                  name="roomRef"
                  type="text"
                  label="Room Reference"
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

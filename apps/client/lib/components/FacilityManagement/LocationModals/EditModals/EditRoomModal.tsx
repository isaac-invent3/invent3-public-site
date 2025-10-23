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
import { roomSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Room } from '~/lib/interfaces/location.interfaces';
import { useUpdateRoomMutation } from '~/lib/redux/services/location/room.services';

interface EditRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Room;
}
const EditRoomModal = (props: EditRoomModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateRoom, { isLoading }] = useUpdateRoomMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      departmentId: data?.departmentId,
      roomName: data?.roomName!,
      roomRef: data?.roomRef!,
    },
    validationSchema: roomSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        roomId: data.roomId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateRoom, finalValue, '');
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
                heading="Edit Room"
                subheading="Edit Room Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
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
                  title="Room Ref"
                  description="Input Room ref."
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

export default EditRoomModal;

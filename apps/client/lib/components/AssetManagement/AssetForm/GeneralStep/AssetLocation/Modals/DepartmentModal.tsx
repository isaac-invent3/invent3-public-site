/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '../../../../../UI/ModalHeading';
import { useCreateDepartmentMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { departmentSchema } from '~/lib/schemas/asset/location.schema';
import TextInput from '~/lib/components/UI/TextInput';
import FloorSelect from './SelectInputs/FloorSelect';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFloorId: number | null;
}
const DepartmentModal = (props: DepartmentModalProps) => {
  const { isOpen, onClose, defaultFloorId } = props;
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      floorId: defaultFloorId ?? null,
      departmentName: null,
      departmentRef: null,
    },
    validationSchema: departmentSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createDepartment, finalValue, '');
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
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack width="full" spacing="32px" p="40px">
            <ModalHeading
              heading="Add New Department"
              subheading="Add a new department that is not on the system yet"
            />

            {/* Main Form Starts Here */}
            <VStack width="full" spacing="16px">
              <FloorSelect type="general" />
              <Field
                as={TextInput}
                name="departmentName"
                type="text"
                label="Department Name"
              />
              <Field
                as={TextInput}
                name="departmentRef"
                type="text"
                label="Department Reference"
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
                Add Department
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default DepartmentModal;

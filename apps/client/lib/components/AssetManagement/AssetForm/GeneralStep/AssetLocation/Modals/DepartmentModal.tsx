/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateDepartmentMutation } from '~/lib/redux/services/asset/location.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { departmentSchema } from '~/lib/schemas/asset/location.schema';
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

  const formik = useFormik({
    initialValues: {
      floorId: defaultFloorId ?? null,
      departmentName: null,
      departmentRef: null,
    },
    validationSchema: departmentSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      const finalValue = { ...values, createdBy: session?.user?.username };
      const response = await handleSubmit(createDepartment, finalValue, '');
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
            <VStack width="full" spacing="32px" p="40px">
              <ModalHeading
                heading="Add New Department"
                subheading="Add a new department that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FloorSelect type="general" />
                <Field
                  as={FormTextInput}
                  name="departmentName"
                  type="text"
                  label="Department Name"
                />
                <Field
                  as={FormTextInput}
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
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add Department
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default DepartmentModal;

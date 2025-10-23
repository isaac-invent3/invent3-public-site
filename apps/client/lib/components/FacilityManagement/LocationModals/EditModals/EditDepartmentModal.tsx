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
import { departmentSchema } from '~/lib/schemas/asset/location.schema';
import React from 'react';
import { Department } from '~/lib/interfaces/location.interfaces';
import { useUpdateDepartmentMutation } from '~/lib/redux/services/location/department.services';

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Department;
}
const EditDepartmentModal = (props: EditDepartmentModalProps) => {
  const { isOpen, onClose, data } = props;
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      floorId: data?.floorId,
      departmentName: data?.departmentName!,
      departmentRef: data?.departmentRef!,
    },
    validationSchema: departmentSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        ...values,
        departmentId: data.departmentId,
        lastModifiedBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(updateDepartment, finalValue, '');
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
                heading="Edit Department"
                subheading="Edit Department Information"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Department Name"
                  description="Input Department name"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="departmentName"
                    type="text"
                    label="Department Name"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Department Ref"
                  description="Input Department ref."
                >
                  <Field
                    as={FormTextInput}
                    name="departmentRef"
                    type="text"
                    label="Department Reference"
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

export default EditDepartmentModal;

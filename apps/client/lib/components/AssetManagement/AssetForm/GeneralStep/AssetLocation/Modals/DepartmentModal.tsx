/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField, useFormik } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { useCreateDepartmentMutation } from '~/lib/redux/services/location/department.services';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import { departmentSchema } from '~/lib/schemas/asset/location.schema';
import FloorSelect from './SelectInputs/FloorSelect';
import { Option } from '@repo/interfaces';
import { FormLocation } from '~/lib/interfaces/location.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFloorId: number | null;
  showDropdown?: boolean;
  showToast?: boolean;
  handleReadableLocation?: (option: Option, key: keyof FormLocation) => void;
}
const DepartmentModal = (props: DepartmentModalProps) => {
  const {
    isOpen,
    onClose,
    defaultFloorId,
    showDropdown = true,
    showToast,
    handleReadableLocation,
  } = props;
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation({});
  const { handleSubmit } = useCustomMutation();
  const { building } = useAppSelector((state) => state.location.localLocation);

  const formik = useFormik({
    initialValues: {
      floorId: (defaultFloorId ?? undefined)!,
      departmentName: '',
      departmentRef: '',
    },
    validationSchema: departmentSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      const finalValue = { ...values, createdBy: session?.user?.username! };

      const response = await handleSubmit(
        createDepartment,
        finalValue,
        showToast ? 'Department Created Successfully' : ''
      );
      if (response?.data) {
        if (handleReadableLocation) {
          handleReadableLocation(
            {
              label: response?.data?.data?.departmentName,
              value: response?.data?.data?.departmentId,
            },
            'department'
          );
        }
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
                heading="Add New Department"
                subheading="Add a new department that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                {showDropdown && (
                  <FormInputWrapper
                    sectionMaxWidth="141px"
                    customSpacing="16px"
                    title="Floor"
                    description="Select Floor"
                    isRequired
                  >
                    <FloorSelect
                      type="specificById"
                      buildingId={building?.value as number}
                    />
                  </FormInputWrapper>
                )}
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
                  title="Department Reference"
                  description="Input Department Reference."
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

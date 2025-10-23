import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useField } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import GenericAsyncSelect from '../../UI/GenericAsyncSelect';
import {
  useCreateDesignationMutation,
  useGetAllDesignationTypesQuery,
  useSearchDesignationTypeMutation,
} from '~/lib/redux/services/designation.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useState } from 'react';
import { designationSchema } from '~/lib/schemas/user.schema';
import { useAppDispatch } from '~/lib/redux/hooks';
import { updateUserForm } from '~/lib/redux/slices/UserSlice';

interface JobDesignationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const JobDesignationModal = (props: JobDesignationModalProps) => {
  const { isOpen, onClose } = props;
  const [createDesignation, { isLoading: isCreating }] =
    useCreateDesignationMutation({});
  const { handleSubmit } = useCustomMutation();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchDesignationType] = useSearchDesignationTypeMutation({});
  const { data, isLoading, isFetching } = useGetAllDesignationTypesQuery({
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber,
  });
  const [field, meta, helpers] = useField('jobTitleId');
  const dispatch = useAppDispatch();

  const formik = useAppFormik({
    initialValues: {
      designationName: '',
      designationTypeId: null,
    },
    validationSchema: designationSchema,
    onSubmit: async (values) => {
      const session = await getSession();
      const finalValue = {
        designationName: values.designationName!,
        designationTypeId: values.designationTypeId!,
        createdBy: session?.user?.username!,
      };
      const response = await handleSubmit(createDesignation, finalValue, '');
      if (response?.data) {
        helpers.setValue(response?.data?.data?.designationId);
        dispatch(
          updateUserForm({
            jobTitleName: response?.data?.data?.designationName!,
          })
        );
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
            <VStack
              width="full"
              spacing="32px"
              p={{ base: '24px', md: '24px' }}
            >
              <ModalHeading
                heading="Add Job Designation"
                subheading="Add a new job designation that is not on the system yet"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Designation Type"
                  isRequired
                  description="Select Designation Type"
                >
                  <GenericAsyncSelect
                    selectName="designationTypeId"
                    selectTitle="Designation Type"
                    data={data}
                    labelKey="designationTypeName"
                    valueKey="designationTypeId"
                    mutationFn={searchDesignationType}
                    isLoading={isLoading || isFetching}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="16px"
                  title="Designation Name"
                  isRequired
                  description="Designation Name"
                >
                  <Field
                    as={FormTextInput}
                    name="designationName"
                    type="text"
                    label="Designation Name"
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
                  isLoading={isCreating || formik.isSubmitting}
                >
                  Add Designation
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default JobDesignationModal;

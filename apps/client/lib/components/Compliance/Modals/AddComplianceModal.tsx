import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextAreaInput,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import ComplianceType from '../Drawers/CreateComplianceDrawer/ComplianceType';
import { createComplianceRegulationSchema } from '~/lib/schemas/asset/compliance.schema';
import { useCreateComplianceRegulationMutation } from '~/lib/redux/services/asset/compliance.services';

interface AddComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddComplianceModal = (props: AddComplianceModalProps) => {
  const { isOpen, onClose } = props;
  const [createCompliance, { isLoading }] =
    useCreateComplianceRegulationMutation({});
  const { handleSubmit } = useCustomMutation();

  const formik = useAppFormik({
    initialValues: {
      regulationId: null,
      standard: null,
      description: null,
    },
    validationSchema: createComplianceRegulationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      const finalValue = {
        regulationTypeId: values.regulationId!,
        standard: values.standard!,
        description: values.description!,
        createdBy: session?.user?.username ?? '',
      };
      const response = await handleSubmit(
        createCompliance,
        finalValue,
        'Compliance Created Successfully'
      );
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
      contentStyle={{ width: { sm: '534px' } }}
    >
      <ModalBody p={0} m={0} width="full">
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack width="full" spacing="32px" px="18px" py="46px">
              <ModalHeading
                heading="Add Compliance"
                subheading="Create a new regulatory or standard compliance type to assign across facilities and asset categories."
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <ComplianceType />
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="24px"
                  description="Specify the expected lifespan of the asset"
                  title="Policy"
                  isRequired
                >
                  <Field
                    as={FormTextInput}
                    name="standard"
                    type="text"
                    label="Policy"
                  />
                </FormInputWrapper>
                <FormInputWrapper
                  sectionMaxWidth="141px"
                  customSpacing="24px"
                  description="Provide details about the task objective"
                  title="Policy Description"
                  isRequired
                >
                  <Field
                    as={FormTextAreaInput}
                    name="description"
                    type="text"
                    label="Description"
                    placeholder="Description"
                    customStyle={{ height: '133px' }}
                  />
                </FormInputWrapper>
              </VStack>
              {/* Main Form Ends Here */}
              <HStack width="full" spacing="24px">
                <Button variant="secondary" handleClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading || formik.isSubmitting}
                >
                  Add
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default AddComplianceModal;

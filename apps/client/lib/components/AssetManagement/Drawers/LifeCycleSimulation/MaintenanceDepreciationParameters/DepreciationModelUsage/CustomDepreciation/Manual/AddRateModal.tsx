import { useAppFormik } from '~/lib/hooks/useAppFormik';
/* eslint-disable no-unused-vars */
import { HStack, ModalBody, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormikContext } from 'formik';

import {
  Button,
  FormTextInput,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { MaintenanceDepreciationFormValues } from '~/lib/interfaces/asset/lifeCycle.interfaces';
import { annualRateSchema } from '~/lib/schemas/asset/lifeCycleSimulation.schema';

interface AddRateModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddRateModal = (props: AddRateModalProps) => {
  const { isOpen, onClose } = props;
  const { setFieldValue, values: mainValues } =
    useFormikContext<MaintenanceDepreciationFormValues>();

  const formik = useAppFormik({
    initialValues: {
      year: null,
      depreciationRate: null,
    },
    validationSchema: annualRateSchema,
    onSubmit: async (values, { resetForm }) => {
      setFieldValue('annualCostBreakDown', [
        ...mainValues?.annualCostBreakDown,
        values,
      ]);
      resetForm();
      onClose();
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
              p={{ base: '24px', md: '40px' }}
            >
              <ModalHeading
                heading="Add New Rate"
                subheading="Add a new year and depreciation rate"
              />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="16px">
                <Field
                  as={FormTextInput}
                  name="year"
                  type="number"
                  label="Year"
                />
                <Field
                  as={FormTextInput}
                  name="depreciationRate"
                  type="number"
                  label="Rate"
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
                  isLoading={formik.isSubmitting}
                  handleClick={() => console.log('data', formik.errors)}
                >
                  Add Rate
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </ModalBody>
    </GenericModal>
  );
};

export default AddRateModal;

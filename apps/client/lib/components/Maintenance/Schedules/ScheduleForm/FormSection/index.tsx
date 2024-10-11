import { Divider, Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';

interface FormSectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const FormSection = (props: FormSectionProps) => {
  const { activeStep, setActiveStep, type } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const dispatch = useAppDispatch();

  const defaultHeader =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';

  const formik = useFormik({
    initialValues: {
      name: formDetails.name ?? null,
      planId: formDetails.planId ?? null,
      typeId: formDetails.typeId ?? null,
      assetId: formDetails.assetId ?? null,
      description: formDetails.description ?? null,
      scheduledDate: formDetails.scheduledDate ?? null,
      completionDate: formDetails.completionDate ?? null,
    },
    validationSchema: scheduleSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(updateScheduleForm(values));
      setActiveStep(1);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 0 ? 'flex' : 'none'}
    >
      <Header headingText={defaultHeader} />
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="37px"
            pl="16px"
            pb="33px"
            pr="30px"
            mt="40px"
            rounded="6px"
            minH="60vh"
            divider={<Divider borderColor="#BBBBBB" />}
          >
            <SectionOne />
            <SectionTwo />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={1}
              activeStep={0}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default FormSection;

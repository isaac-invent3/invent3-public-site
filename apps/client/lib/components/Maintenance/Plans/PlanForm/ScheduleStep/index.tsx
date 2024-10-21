import { Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import SectionTwo from '../../../Schedules/ScheduleForm/FormSection/SectionTwo';
import MaintenanceSchedules from './MaintenanceSchedule';

interface ScheduleStepProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const ScheduleStep = (props: ScheduleStepProps) => {
  const { activeStep, setActiveStep, type } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: formDetails.name ?? null,
      planId: formDetails.planId ?? null,
      typeId: formDetails.typeId ?? null,
      frequencyId: formDetails.frequencyId ?? null,
      assetId: formDetails.assetId ?? null,
      sla: formDetails.sla ?? null,
      description: formDetails.description ?? null,
      comment: formDetails.comment ?? null,
      scheduledDate: formDetails.scheduledDate ?? null,
      completionDate: formDetails.completionDate ?? null,
      tasks: formDetails.tasks ?? [],
      taskCount: formDetails?.taskCount ?? 0,
    },
    validationSchema: scheduleSchema(type === 'create', false),
    enableReinitialize: true,

    onSubmit: async (values) => {
      dispatch(updateScheduleForm(values));
      setActiveStep(2);
    },
  });

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 1 ? 'flex' : 'none'}
    >
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="40px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="37px"
            pl="16px"
            pb="33px"
            pr="30px"
            rounded="6px"
            minH="60vh"
          >
            {type === 'edit' && <MaintenanceSchedules />}
            <SectionTwo />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={3}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default ScheduleStep;

import { VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  clearScheduleForm,
  updatePlanForm,
} from '~/lib/redux/slices/MaintenanceSlice';
import SectionTwo from '../../../Schedules/ScheduleForm/FormSection/SectionTwo';
import Button from '~/lib/components/UI/Button';

interface ScheduleFormProps {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { type, setShowScheduleForm } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const planDetails = useAppSelector((state) => state.maintenance.planForm);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      localId: formDetails.localId ?? null,
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
    validationSchema: scheduleSchema(type === 'create', false, false),
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const newScheduleInfo = {
        ...values,
        typeName: formDetails.typeName,
        assetTypeId: formDetails.assetTypeId,
        assetName: formDetails.assetName,
        frequencyName: formDetails.frequencyName,
        assetLocation: formDetails.assetLocation,
        ticketId: formDetails.ticketId,
        scheduleId: formDetails.scheduleId ?? null,
        maintenancePlanInfo: {
          planName: planDetails.planName,
          planType: planDetails.planTypeName,
          assetName: null,
          assetTypeName: null,
          planStatus: null,
          startDate: null,
          endDate: null,
        },
      };
      if (values.localId) {
        const newPlanSchedules = planDetails.schedules.filter(
          (item) => item.localId !== values.localId
        );
        dispatch(
          updatePlanForm({ schedules: [...newPlanSchedules, newScheduleInfo] })
        );
      } else {
        dispatch(
          updatePlanForm({
            schedules: [
              ...planDetails.schedules,
              {
                ...newScheduleInfo,
                localId: planDetails.schedules.length + 1,
              },
            ],
          })
        );
      }
      resetForm();
      dispatch(clearScheduleForm());
      setShowScheduleForm(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <VStack
          spacing="16px"
          width="full"
          alignItems="flex-end"
          bgColor="#E4E4E4"
          pt="16px"
          pl="21px"
          pr="24px"
          pb="22px"
          rounded="8px"
        >
          <SectionTwo descriptionHeight="83px" />
          <Button
            customStyles={{ width: '161px' }}
            handleClick={formik.handleSubmit}
          >
            {formDetails?.localId ? 'Update' : 'Add'} Schedule
          </Button>
        </VStack>
      </form>
    </FormikProvider>
  );
};

export default ScheduleForm;

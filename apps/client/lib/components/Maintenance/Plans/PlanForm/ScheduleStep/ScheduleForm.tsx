import { HStack, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import {
  clearScheduleForm,
  updatePlanForm,
} from '~/lib/redux/slices/MaintenanceSlice';
import SectionTwo from '../../../Schedules/ScheduleForm/FormSection/SectionTwo';
import Button from '~/lib/components/UI/Button';
import GenericLeaveDialogModal from '~/lib/components/UI/Modal/LeaveDialogModal';
import moment from 'moment';
import { validateFrequencyInstance } from '../../../Common/helperFunctions';

interface ScheduleFormProps {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'create' | 'edit';
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { type, setShowScheduleForm } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const planDetails = useAppSelector((state) => state.maintenance.planForm);
  const [hasAScheduleInstance, setHasAScheduleInstance] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure();

  const previousDay = moment(planDetails.startDate, 'DD/MM/YYYY')
    .subtract(1, 'days')
    .format('DD/MM/YYYY');

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
    validationSchema: scheduleSchema(
      type === 'create',
      false,
      false,
      previousDay,
      planDetails?.endDate ?? undefined
    ),
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

  const handleProceedDialog = () => {
    setShowScheduleForm(false);
    onCloseDialog();
  };

  //Validates if the selected Frequency and start date would have an instance
  useEffect(() => {
    if (
      formik.values.scheduledDate &&
      formik.values.frequencyId &&
      formDetails.frequencyName
    ) {
      const hasAnInstance = validateFrequencyInstance(
        formDetails.frequencyName,
        formik.values.scheduledDate,
        planDetails.endDate
      );
      if (hasAnInstance) {
        setHasAScheduleInstance(hasAnInstance);
      } else {
        setHasAScheduleInstance(false);
        toast({
          title:
            "Selected Frequency and Start Date doesn't have a schedule Instance",
          status: 'error',
          position: 'top-right',
        });
      }
    }
  }, [formik.values.scheduledDate, formik.values.frequencyId]);

  return (
    <>
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
            <SectionTwo
              descriptionHeight="83px"
              dateTimeButtonVariant="outline"
              minScheduleDate={(planDetails.startDate
                ? moment(planDetails.startDate, 'DD/MM/YYYY')
                : moment()
              ).toDate()}
              maxScheduleDate={
                planDetails.endDate
                  ? moment(planDetails.endDate, 'DD/MM/YYYY').toDate()
                  : undefined
              }
            />
            <HStack spacing="24px">
              <Button
                variant="secondary"
                customStyles={{ width: '96px' }}
                handleClick={() => onOpenDialog()}
              >
                Cancel
              </Button>
              <Button
                customStyles={{ width: '161px' }}
                handleClick={formik.handleSubmit}
                isDisabled={!hasAScheduleInstance}
              >
                {formDetails?.localId ? 'Update' : 'Add'} Schedule
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
      <GenericLeaveDialogModal
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        handleProceed={handleProceedDialog}
      />
    </>
  );
};

export default ScheduleForm;

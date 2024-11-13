import { HStack, useDisclosure, VStack } from '@chakra-ui/react';
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
import GenericLeaveDialogModal from '~/lib/components/UI/Modal/LeaveDialogModal';
import moment from 'moment';

interface ScheduleFormProps {
  setShowScheduleForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const ScheduleForm = (props: ScheduleFormProps) => {
  const { setShowScheduleForm } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const planDetails = useAppSelector((state) => state.maintenance.planForm);
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
      scheduleId: formDetails.scheduleId ?? null,
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
      formDetails.scheduleId === null,
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
        endDate: formDetails.endDate ?? null,
        intervalValue: formDetails.intervalValue ?? 1,
        dayOccurrences: formDetails.dayOccurrences ?? null,
        weekOccurrences: formDetails.weekOccurrences ?? null,
        monthOccurrences: formDetails.monthOccurrences ?? null,
        yearOccurences: formDetails.yearOccurences ?? null,
        firstInstanceDate: formDetails.firstInstanceDate ?? null,
        deletedTaskIDs: [],
        updatedTaskIDs: [],
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
        //Update an existing schedule
        const newPlanSchedules = planDetails.schedules.filter(
          (item) => item.localId !== values.localId
        );
        dispatch(
          updatePlanForm({
            schedules: [...newPlanSchedules, newScheduleInfo],
          })
        );
        //Mark as updated if schedule Id exist and is not included in the list
        if (
          formDetails.scheduleId &&
          !planDetails.updatedScheduleIDs.includes(formDetails.scheduleId)
        ) {
          dispatch(
            updatePlanForm({
              updatedScheduleIDs: [
                ...planDetails.updatedScheduleIDs,
                formDetails.scheduleId,
              ],
            })
          );
        }
      } else {
        // Store the new schedule
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
              buttonVariant="outline"
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

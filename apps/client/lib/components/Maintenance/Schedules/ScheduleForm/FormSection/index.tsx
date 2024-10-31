import { Divider, Flex, useToast, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import moment from 'moment';
import { validateFrequencyInstance } from '../../../Common/helperFunctions';

interface FormSectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const FormSection = (props: FormSectionProps) => {
  const { activeStep, setActiveStep, type } = props;
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const [hasAScheduleInstance, setHasAScheduleInstance] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const defaultHeader =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';

  const previousDay = moment(formDetails?.maintenancePlanInfo?.startDate)
    .subtract(1, 'days')
    .format('DD/MM/YYYY');

  const planEndDate = moment(formDetails?.maintenancePlanInfo?.endDate).format(
    'DD/MM/YYYY'
  );

  const formik = useFormik({
    initialValues: {
      name: formDetails.name ?? null,
      planId: formDetails.planId ?? null,
      typeId: formDetails.typeId ?? null,
      frequencyId: formDetails.typeId ?? null,
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
      true,
      true,
      previousDay ?? undefined,
      planEndDate ?? undefined
    ),
    enableReinitialize: true,

    onSubmit: async (values, { setTouched }) => {
      setTouched({ planId: true });
      dispatch(updateScheduleForm(values));
      setActiveStep(1);
    },
  });

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
        formDetails.maintenancePlanInfo.endDate
      );
      if (hasAnInstance) {
        setHasAScheduleInstance(hasAScheduleInstance);
      } else {
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
            <SectionTwo
              dateTimeButtonVariant="solid"
              minScheduleDate={moment(
                formDetails?.maintenancePlanInfo?.startDate ?? moment()
              ).toDate()}
              maxScheduleDate={
                formDetails?.maintenancePlanInfo?.endDate
                  ? moment(formDetails?.maintenancePlanInfo?.endDate).toDate()
                  : undefined
              }
            />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              cancelLink="/maintenance"
              totalStep={1}
              activeStep={0}
              setActiveStep={setActiveStep}
              disablePrimaryButton={!hasAScheduleInstance}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default FormSection;

import { Divider, Flex, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import Header from '../Header';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { updateScheduleForm } from '~/lib/redux/slices/MaintenanceSlice';
import moment from 'moment';

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

  const planStartDate = moment(formDetails?.maintenancePlanInfo?.startDate)
    .subtract(1, 'days')
    .format('DD/MM/YYYY');

  const finalStartDate = moment(planStartDate, 'DD/MM/YYYY').isBefore(
    moment(),
    'day'
  )
    ? moment().format('DD/MM/YYYY')
    : planStartDate;

  const planEndDate = moment(formDetails?.maintenancePlanInfo?.endDate).format(
    'DD/MM/YYYY'
  );

  const formik = useFormik({
    initialValues: {
      name: formDetails.name ?? null,
      planId: formDetails.planId ?? null,
      typeId: formDetails.typeId ?? null,
      frequencyId: formDetails.frequencyId ?? null,
      assetId: formDetails.assetId ?? null,
      sla: formDetails.sla ?? null,
      scheduleId: formDetails.scheduleId ?? null,
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
      finalStartDate,
      planEndDate ?? undefined
    ),
    enableReinitialize: true,

    onSubmit: async (values, { setTouched }) => {
      setTouched({ planId: true });
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
              buttonVariant="secondary"
              minScheduleDate={moment(finalStartDate, 'DD/MM/YYYY').toDate()}
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
              totalStep={2}
              activeStep={1}
              setActiveStep={setActiveStep}
            />
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default FormSection;

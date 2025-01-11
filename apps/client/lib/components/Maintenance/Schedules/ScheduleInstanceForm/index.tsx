import { Flex, useDisclosure, VStack } from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';
import { FormikProvider, useFormik } from 'formik';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import {
  Button,
  FormActionButtons,
  withFormLeaveDialog,
} from '@repo/ui/components';
import { useUpdateScheduleInstanceandTaskInstancesMutation } from '~/lib/redux/services/maintenance/scheduleInstance.services';
import SectionTwo from '../ScheduleForm/FormSection/SectionTwo';
import moment from 'moment';
import AssetInfo from './AssetInfo';
import Tasks from './Tasks';
import { getSession } from 'next-auth/react';
import { INSTANCE_UPDATE_ENUM, ROUTES } from '~/lib/utils/constants';
import { generateTasksArray } from '../../Common/helperFunctions';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import ScheduleInstanceSuccessModal from './SuccessModal';
import { TaskInstancePayload } from '~/lib/interfaces/task.interfaces';
import PageHeader from '~/lib/components/UI/PageHeader';

const ScheduleInstanceForm = () => {
  const formDetails = useAppSelector((state) => state.maintenance.scheduleForm);
  const { handleSubmit } = useCustomMutation();
  const [updateScheduleInstance, { isLoading }] =
    useUpdateScheduleInstanceandTaskInstancesMutation({});
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      saveOnlyThisInstance: true,
    },
    validationSchema: scheduleSchema(
      false,
      false,
      false,
      false,
      undefined,
      undefined
    ),
    enableReinitialize: true,

    onSubmit: async (values) => {
      const session = await getSession();
      const username = session?.user?.username as string;
      const instanceUpdateType = values.saveOnlyThisInstance
        ? INSTANCE_UPDATE_ENUM.ONLY_THIS_INSTANCE
        : INSTANCE_UPDATE_ENUM.CURRENT_AND_FUTURE_INSTANCES;
      const finalData = {
        updateMaintenanceScheduleInstanceDto: {
          scheduleInstanceId: values.scheduleId!,
          scheduledDate: moment(values.scheduledDate, 'DD/MM/YYYY hh:mmA')
            .utcOffset(0, true)
            .toISOString()!,
          scheduleInstanceName: values.name!,
          updateType: instanceUpdateType!,
          lastModifiedBy: session?.user?.username!,
        },
        updateTaskInstanceDtos: (() => {
          const tasksArray = [
            // Generate for only task that has been added or updated
            ...generateTasksArray(
              values.tasks.filter(
                (task) =>
                  (task.taskId &&
                    formDetails.updatedTaskIDs.includes(task.taskId)) ||
                  task.taskId === null
              ),
              formDetails.updatedTaskIDs,
              username,
              instanceUpdateType,
              'instance'
            ),
          ];
          return tasksArray.length > 0
            ? (tasksArray as TaskInstancePayload[])
            : null;
        })(),
      };
      const response = await handleSubmit(
        updateScheduleInstance,
        finalData,
        ''
      );
      if (response?.data) {
        onOpen();
      }
    },
  });

  return (
    <>
      <Flex width="full" height="full" direction="column" gap="40px" pb="25px">
        <PageHeader>Edit Maintenance Schedule Instance</PageHeader>
        <Flex
          width="full"
          direction="column"
          roundedTop="8px"
          overflow="hidden"
        >
          <AssetInfo />
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack width="full" alignItems="flex-end" spacing="16px">
                <VStack
                  width="full"
                  bgColor="white"
                  pt="40px"
                  pl="16px"
                  pr="30px"
                  pb="60px"
                  roundedBottom="8px"
                >
                  <SectionTwo
                    scheduleType="instance"
                    buttonVariant="secondary"
                    minScheduleDate={moment().toDate()}
                    maxScheduleDate={
                      formDetails?.maintenancePlanInfo?.endDate
                        ? moment(
                            formDetails?.maintenancePlanInfo?.endDate
                          ).toDate()
                        : undefined
                    }
                  />
                  <Flex
                    width="full"
                    mt="40px"
                    pt="24px"
                    borderTop="1px solid #BBBBBB"
                  >
                    <Tasks />
                  </Flex>
                </VStack>
                <FormActionButtons
                  cancelLink={`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}`}
                  totalStep={1}
                  activeStep={1}
                  finalText="Save This Instance"
                  isLoading={
                    (isLoading || formik.isSubmitting) &&
                    formik.values.saveOnlyThisInstance
                  }
                  type="submit"
                  loadingText="Saving..."
                  handleContinue={() =>
                    formik.setFieldValue('saveOnlyThisInstance', true)
                  }
                >
                  <Button
                    variant="outline"
                    handleClick={() => {
                      formik.setFieldValue('saveOnlyThisInstance', false);
                      formik.handleSubmit();
                    }}
                    isLoading={
                      !formik.values.saveOnlyThisInstance &&
                      (isLoading || formik.isSubmitting)
                    }
                    loadingText="Saving..."
                    customStyles={{ minW: '234px' }}
                  >
                    Save This and Future Instances
                  </Button>
                </FormActionButtons>
              </VStack>
            </form>
          </FormikProvider>
        </Flex>
      </Flex>
      <ScheduleInstanceSuccessModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default withFormLeaveDialog(ScheduleInstanceForm);

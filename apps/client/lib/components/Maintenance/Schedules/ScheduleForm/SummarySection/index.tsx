import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import Header from '../Header';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import ScheduleSuccessModal from '../SuccessModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateMaintenanceScheduleAndTasksMutation } from '~/lib/redux/services/maintenance/schedule.services';
import {
  generateMaintenanceScheduleDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import { useUpdateMaintenancePlanWithSchedulesMutation } from '~/lib/redux/services/maintenance/plan.services';
import { FORM_ENUM } from '~/lib/utils/constants';

interface SummarySectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const SummarySection = (props: SummarySectionProps) => {
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const scheduleFormDetails = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const { handleSubmit } = useCustomMutation();
  const [createScheduleAndTasks, { isLoading: isCreating }] =
    useCreateMaintenanceScheduleAndTasksMutation();
  const [updateScheduleAndTasks, { isLoading: isUpdating }] =
    useUpdateMaintenancePlanWithSchedulesMutation();
  const breadCrumbText =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';
  const { data } = useSession();
  const username = data?.user?.username;

  const PAYLOAD = {
    [type === 'create'
      ? 'createMaintenanceScheduleDto'
      : 'updateMaintenanceScheduleDto']: generateMaintenanceScheduleDTO(
      type,
      scheduleFormDetails,
      [scheduleFormDetails.scheduleId as number],
      username as string
    ),
    [type === 'create' ? 'createTaskDtos' : 'updateTaskDtos']: (() => {
      const tasksArray = [
        // Deleted Task
        ...scheduleFormDetails.deletedTaskIDs.map((item) => ({
          taskId: item,
          actionType: FORM_ENUM.delete,
          changeInitiatedBy: username,
        })),
        // Generate for only task that has been added or updated
        ...generateTasksArray(
          scheduleFormDetails.tasks.filter(
            (task) =>
              (task.taskId &&
                scheduleFormDetails.updatedTaskIDs.includes(task.taskId)) ||
              task.taskId === null
          ),
          scheduleFormDetails.updatedTaskIDs,
          username as string
        ),
      ];

      return tasksArray.length > 0 ? tasksArray : null;
    })(),
  };

  const handleSumbitSchedule = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createScheduleAndTasks, PAYLOAD, '');
      // console.log(PAYLOAD);
    } else {
      response = await handleSubmit(
        updateScheduleAndTasks,
        {
          updateMaintenancePlanDto: {
            maintenancePlanId: scheduleFormDetails.planId,
            lastModifiedBy: username,
          },
          masterUpdateMaintenanceScheduleDto: [PAYLOAD],
        },
        ''
      );
    }
    if (response?.data) {
      onOpen();
    }
  };

  return (
    <Flex
      width="full"
      height="full"
      direction="column"
      display={activeStep === 2 ? 'flex' : 'none'}
    >
      <Header
        headingText="Maintenance Schedule Summary"
        breadCrumbText={breadCrumbText}
      />
      <VStack
        spacing="32px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        pt="26px"
        pl="16px"
        pb="32px"
        pr="30px"
        mt="40px"
        rounded="6px"
        minH="60vh"
        divider={<Divider borderColor="#BBBBBB" />}
      >
        <SectionOne />
        <SectionTwo formDetails={scheduleFormDetails} />
      </VStack>
      <Flex width="full" mt="16px">
        <FormActionButtons
          cancelLink="/maintenance"
          totalStep={2}
          activeStep={2}
          finalText={type === 'create' ? 'Save' : 'Save Changes'}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitSchedule}
          isLoading={isCreating || isUpdating}
          loadingText={isCreating ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      {isOpen && (
        <ScheduleSuccessModal isOpen={isOpen} onClose={onClose} type={type} />
      )}
    </Flex>
  );
};

export default SummarySection;

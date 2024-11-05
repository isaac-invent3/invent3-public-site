import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  generateMaintenanceScheduleDTO,
  generatePlanDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import PlanSuccessModal from './PlanSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import {
  useCreateMaintenancePlanWithSchedulesMutation,
  useUpdateMaintenancePlanWithSchedulesMutation,
} from '~/lib/redux/services/maintenance/plan.services';

interface SummarySectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const SummarySection = (props: SummarySectionProps) => {
  const { handleSubmit } = useCustomMutation();
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const planFormDetails = useAppSelector((state) => state.maintenance.planForm);
  const [createMaintenancePlan, { isLoading: createLoading }] =
    useCreateMaintenancePlanWithSchedulesMutation();
  const [updateMaintenancePlan, { isLoading: updateLoading }] =
    useUpdateMaintenancePlanWithSchedulesMutation();
  const { data } = useSession();
  const username = data?.user?.username;

  const getDtoKey = (base: string) =>
    `${type === 'create' ? `create${base}Dto` : `update${base}Dto`}`;

  const PAYLOAD = {
    [getDtoKey('MaintenancePlan')]: generatePlanDTO(
      type,
      planFormDetails,
      username as string
    ),
    [type === 'create'
      ? 'createMaintenanceScheduleDtos'
      : 'masterUpdateMaintenanceScheduleDto']: planFormDetails.schedules
      .filter(
        // Filter for schedules that has been added, updated or deleted
        (schedule) =>
          (schedule.scheduleId &&
            (planFormDetails.updatedScheduleIDs.includes(schedule.scheduleId) ||
              planFormDetails.deletedScheduleIDs.includes(
                schedule.scheduleId
              ))) ||
          schedule.scheduleId === null
      )
      .map((schedule: ScheduleFormDetails) => ({
        [getDtoKey('MaintenanceSchedule')]: generateMaintenanceScheduleDTO(
          type,
          schedule,
          planFormDetails.updatedScheduleIDs,
          planFormDetails.deletedScheduleIDs,
          username as string
        ),
        [getDtoKey('Task')]: generateTasksArray(
          type,
          // Generate for only task that has been added, updated or deleted
          schedule.tasks.filter(
            (task) =>
              (task.taskId &&
                (schedule.updatedTaskIDs.includes(task.taskId) ||
                  schedule.deletedTaskIDs.includes(task.taskId))) ||
              task.taskId === null
          ),
          schedule.updatedTaskIDs,
          schedule.deletedTaskIDs,
          username as string
        ),
      })),
  };

  const handleSumbitPlan = async () => {
    let response;
    response = await handleSubmit(
      type === 'create' ? createMaintenancePlan : updateMaintenancePlan,
      PAYLOAD,
      ''
    );

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
      <VStack
        spacing="34px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        pt="26px"
        pl="16px"
        pb="32px"
        pr="30px"
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
          activeStep={1}
          finalText={type === 'create' ? 'Finish' : 'Save Changes'}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitPlan}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      {isOpen && (
        <PlanSuccessModal isOpen={isOpen} onClose={onClose} type={type} />
      )}
    </Flex>
  );
};

export default SummarySection;

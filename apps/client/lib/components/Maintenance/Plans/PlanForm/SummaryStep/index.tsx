import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateMaintenanceScheduleMutation } from '~/lib/redux/services/maintenance/schedule.services';
import {
  generateMaintenanceScheduleDTO,
  generatePlanDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import PlanSuccessModal from './PlanSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useCreateMaintenancePlanWithSchedulesMutation } from '~/lib/redux/services/maintenance/plan.services';

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
  const planFormDetails = useAppSelector((state) => state.maintenance.planForm);
  const { handleSubmit } = useCustomMutation();
  const [createMaintenancePlan, { isLoading: createLoading }] =
    useCreateMaintenancePlanWithSchedulesMutation();
  const [updateSchedule, { isLoading: updateLoading }] =
    useUpdateMaintenanceScheduleMutation();
  const { data } = useSession();
  const username = data?.user?.username;

  const PAYLOAD = {
    createMaintenancePlanDto: generatePlanDTO(
      type,
      planFormDetails,
      username as string
    ),
    createMaintenanceScheduleDtos: planFormDetails.schedules.map(
      (value: ScheduleFormDetails) => ({
        createMaintenanceScheduleDto: generateMaintenanceScheduleDTO(
          type,
          value,
          username as string
        ),
        createTaskDtos: generateTasksArray(
          type,
          value.tasks,
          username as string
        ),
      })
    ),
  };

  const handleSumbitSchedule = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createMaintenancePlan, PAYLOAD, '');
    } else {
      response = await handleSubmit(
        updateSchedule,
        {
          id: scheduleFormDetails.scheduleId,
          ...generateMaintenanceScheduleDTO(
            type,
            scheduleFormDetails,
            username as string
          ),
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
          handleContinue={handleSumbitSchedule}
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

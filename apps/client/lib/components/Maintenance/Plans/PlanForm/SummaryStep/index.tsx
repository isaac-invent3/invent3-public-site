import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateMaintenanceScheduleAndTasksMutation,
  useUpdateMaintenanceScheduleMutation,
} from '~/lib/redux/services/maintenance/schedule.services';
import {
  generateMaintenanceScheduleDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import PlanSuccessModal from './PlanSuccessModal';
import SectionOne from './SectionOne';
import {
  clearScheduleForm,
  updateScheduleForm,
} from '~/lib/redux/slices/MaintenanceSlice';
import SectionTwo from './SectionTwo';

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
  const [createScheduleAndTasks, { isLoading: createLoading }] =
    useCreateMaintenanceScheduleAndTasksMutation();
  const [updateSchedule, { isLoading: updateLoading }] =
    useUpdateMaintenanceScheduleMutation();
  const { data } = useSession();
  const username = data?.user?.username;
  const dispatch = useAppDispatch();

  const PAYLOAD = {
    createMaintenanceScheduleDto: generateMaintenanceScheduleDTO(
      type,
      scheduleFormDetails,
      username as string
    ),
    createTaskDtos: generateTasksArray(
      type,
      scheduleFormDetails.tasks,
      username as string
    ),
  };

  const handleSumbitSchedule = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createScheduleAndTasks, PAYLOAD, '');
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

  const handleModalButtons = (addAnotherSchedule: boolean) => {
    if (addAnotherSchedule) {
      const { planId, maintenancePlanInfo } = scheduleFormDetails;
      const tempInfo = { planId, maintenancePlanInfo };
      dispatch(clearScheduleForm());
      dispatch(updateScheduleForm({ ...tempInfo }));
      setActiveStep(activeStep - 1);
      onClose();
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
        <PlanSuccessModal
          isOpen={isOpen}
          onClose={handleModalButtons}
          type={type}
        />
      )}
    </Flex>
  );
};

export default SummarySection;

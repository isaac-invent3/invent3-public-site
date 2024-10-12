import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import FormActionButtons from '~/lib/components/UI/Form/FormActionButtons';
import Header from '../Header';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import moment from 'moment';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSession } from 'next-auth/react';
import ScheduleSuccessModal from '../SuccessModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateMaintenanceScheduleMutation,
  useUpdateMaintenanceScheduleMutation,
} from '~/lib/redux/services/maintenance/schedule.services';

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
  const [createSchedule, { isLoading: createLoading }] =
    useCreateMaintenanceScheduleMutation();
  const [updateSchedule, { isLoading: updateLoading }] =
    useUpdateMaintenanceScheduleMutation();
  const breadCrumbText =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';
  const { data } = useSession();
  const username = data?.user?.username;

  const PAYLOAD = {
    planId: scheduleFormDetails.planId,
    scheduleName: scheduleFormDetails.name,
    description: scheduleFormDetails.description,
    comments: scheduleFormDetails.comment,
    sla: scheduleFormDetails.sla,
    maintenanceTypeId: scheduleFormDetails.typeId,
    frequencyId: scheduleFormDetails.typeId,
    scheduledDate: moment(
      scheduleFormDetails.scheduledDate,
      'DD/MM/YYYY hh:mmA'
    ).utcOffset(0, true),
    completionDate: moment(
      scheduleFormDetails.completionDate,
      'DD/MM/YYYY hh:mmA'
    ).utcOffset(0, true),
    ...(type === 'edit'
      ? {
          scheduleId: scheduleFormDetails.scheduleId,
        }
      : {}),
    [`${type === 'create' ? 'createdBy' : 'lastModifiedBy'}`]: username,
  };

  const handleSumbitSchedule = async () => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(createSchedule, PAYLOAD, '');
    } else {
      response = await handleSubmit(
        updateSchedule,
        { id: scheduleFormDetails.scheduleId, ...PAYLOAD },
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
      display={activeStep === 1 ? 'flex' : 'none'}
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
        <SectionTwo />
      </VStack>
      <Flex width="full" mt="16px">
        <FormActionButtons
          cancelLink="/maintenance"
          totalStep={1}
          activeStep={1}
          setActiveStep={setActiveStep}
          handleContinue={handleSumbitSchedule}
          isLoading={createLoading || updateLoading}
          loadingText={createLoading ? 'Submitting...' : 'Updating...'}
        />
      </Flex>
      {isOpen && (
        <ScheduleSuccessModal isOpen={isOpen} onClose={onClose} type={type} />
      )}
    </Flex>
  );
};

export default SummarySection;

import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
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
import { FORM_ENUM, SYSTEM_CONTEXT_TYPE } from '~/lib/utils/constants';
import Button from '~/lib/components/UI/Button';
import SaveAsTemplateModal from '~/lib/components/Common/Modals/SaveAsTemplateModal';
import { useGetTemplateInfoBySystemContextTypeAndContextIdQuery } from '~/lib/redux/services/template.services';

interface SummarySectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const SummarySection = (props: SummarySectionProps) => {
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSaveAsTemplate,
    onOpen: onOpenSaveAsTemplate,
    onClose: onCloseSaveAsTemplate,
  } = useDisclosure();
  const scheduleFormDetails = useAppSelector(
    (state) => state.maintenance.scheduleForm
  );
  const { handleSubmit } = useCustomMutation();
  const [createScheduleAndTasks, { isLoading: isCreating }] =
    useCreateMaintenanceScheduleAndTasksMutation();
  const [updateScheduleAndTasks, { isLoading: isUpdating }] =
    useUpdateMaintenancePlanWithSchedulesMutation();
  const { isSuccess, isLoading } =
    useGetTemplateInfoBySystemContextTypeAndContextIdQuery(
      {
        systemContextTypeId: SYSTEM_CONTEXT_TYPE.MAINTENANCE_SCHEDULES,
        contextId: scheduleFormDetails?.scheduleId,
      },
      { skip: !scheduleFormDetails?.scheduleId }
    );
  const breadCrumbText =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';
  const { data } = useSession();
  const username = data?.user?.username;

  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const handleSaveAsTemplate = (
    templateName: string,
    templateDescription: string
  ) => {
    setSaveAsTemplate(true);
    handleSubmitSchedule(true, templateName, templateDescription);
  };

  const generatePayload = (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const PAYLOAD = {
      [type === 'create'
        ? 'createMaintenanceScheduleDto'
        : 'updateMaintenanceScheduleDto']: {
        ...generateMaintenanceScheduleDTO(
          type,
          scheduleFormDetails,
          [scheduleFormDetails.scheduleId as number],
          username as string
        ),
        saveAsTemplate,
        templateName,
        templateDescription,
      },
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
    return PAYLOAD;
  };

  const handleSubmitSchedule = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    let response;
    if (type === 'create') {
      response = await handleSubmit(
        createScheduleAndTasks,
        generatePayload(saveAsTemplate, templateName, templateDescription),
        ''
      );
      // console.log(PAYLOAD);
    } else {
      response = await handleSubmit(
        updateScheduleAndTasks,
        {
          updateMaintenancePlanDto: {
            maintenancePlanId: scheduleFormDetails.planId,
            lastModifiedBy: username,
          },
          masterUpdateMaintenanceScheduleDto: generatePayload(
            saveAsTemplate,
            templateName,
            templateDescription
          ),
        },
        ''
      );
    }
    if (response?.data) {
      setSaveAsTemplate(false);
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
          handleContinue={() => handleSubmitSchedule(false)}
          isLoading={saveAsTemplate ? false : isCreating || isUpdating}
          loadingText={isCreating ? 'Submitting...' : 'Updating...'}
        >
          {!isLoading ? (
            !isSuccess && (
              <Button variant="outline" handleClick={onOpenSaveAsTemplate}>
                Save and Create Template
              </Button>
            )
          ) : (
            <></>
          )}
        </FormActionButtons>
      </Flex>
      {isOpen && (
        <ScheduleSuccessModal isOpen={isOpen} onClose={onClose} type={type} />
      )}
      <SaveAsTemplateModal
        isOpen={isOpenSaveAsTemplate}
        onClose={onCloseSaveAsTemplate}
        handleSave={handleSaveAsTemplate}
        isLoading={isCreating || isUpdating}
      />
    </Flex>
  );
};

export default SummarySection;

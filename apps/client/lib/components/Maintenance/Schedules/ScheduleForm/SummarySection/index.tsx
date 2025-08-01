import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { useAppSelector } from '~/lib/redux/hooks';
import ScheduleSuccessModal from '../SuccessModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useCreateMaintenanceScheduleAndTasksMutation } from '~/lib/redux/services/maintenance/schedule.services';
import {
  generateMaintenanceScheduleDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import { useUpdateMaintenancePlanWithSchedulesMutation } from '~/lib/redux/services/maintenance/plan.services';
import { FORM_ENUM, ROUTES, SYSTEM_CONTEXT_TYPE } from '~/lib/utils/constants';
import { Button, FormActionButtons } from '@repo/ui/components';
import SaveAsTemplateModal, {
  SaveAsTemplatePayload,
} from '~/lib/components/Common/Modals/SaveAsTemplateModal';
import { useGetTemplateInfoBySystemContextTypeAndContextIdQuery } from '~/lib/redux/services/template.services';
import { getSession } from 'next-auth/react';
import { TaskPayload } from '~/lib/interfaces/task.interfaces';
import PageHeader from '~/lib/components/UI/PageHeader';

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

  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const handleSaveAsTemplate = async (data: SaveAsTemplatePayload) => {
    setSaveAsTemplate(true);
    await handleSubmitSchedule(
      true,
      data.templateName,
      data.templateDescription
    );
  };

  const generatePayload = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const session = await getSession();
    const username = session?.user?.username;

    const schedule = {
      ...generateMaintenanceScheduleDTO(
        type,
        scheduleFormDetails,
        [scheduleFormDetails.scheduleId as number],
        username as string
      ),
      saveAsTemplate,
      templateName,
      templateDescription,
    };

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

    const tasks = tasksArray.length > 0 ? (tasksArray as TaskPayload[]) : null;

    return { schedule, tasks };
  };

  const handleSubmitSchedule = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const session = await getSession();
    const username = session?.user?.username;
    let response;
    const { schedule, tasks } = await generatePayload(
      saveAsTemplate,
      templateName,
      templateDescription
    );
    if (type === 'create') {
      response = await handleSubmit(
        createScheduleAndTasks,
        {
          createMaintenanceScheduleDto: schedule,
          createTaskDtos: tasks,
        },
        ''
      );
    } else {
      response = await handleSubmit(
        updateScheduleAndTasks,
        {
          updateMaintenancePlanDto: {
            maintenancePlanId: scheduleFormDetails.planId!,
            lastModifiedBy: username,
          },
          masterUpdateMaintenanceScheduleDto: [
            { updateMaintenanceScheduleDto: schedule, updateTaskDtos: tasks },
          ],
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
      <PageHeader>Maintenance Schedule Summary</PageHeader>
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
          cancelLink={`/${ROUTES.MAINTENANCE}`}
          totalStep={2}
          activeStep={2}
          finalText={type === 'create' ? 'Save' : 'Save Changes'}
          setActiveStep={setActiveStep}
          handleContinue={() => {
            setSaveAsTemplate(false);
            handleSubmitSchedule(false);
          }}
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

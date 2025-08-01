import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { Button, FormActionButtons } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import SaveAsTemplateModal, {
  SaveAsTemplatePayload,
} from '~/lib/components/Common/Modals/SaveAsTemplateModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { TaskPayload } from '~/lib/interfaces/task.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import {
  useCreateMaintenancePlanWithSchedulesMutation,
  useUpdateMaintenancePlanWithSchedulesMutation,
} from '~/lib/redux/services/maintenance/plan.services';
import { useGetTemplateInfoBySystemContextTypeAndContextIdQuery } from '~/lib/redux/services/template.services';
import { FORM_ENUM, ROUTES, SYSTEM_CONTEXT_TYPE } from '~/lib/utils/constants';
import {
  generateMaintenanceScheduleDTO,
  generatePlanDTO,
  generateTasksArray,
} from '../../../Common/helperFunctions';
import PlanSuccessModal from './PlanSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';

interface SummarySectionProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  type: 'create' | 'edit';
}
const SummarySection = (props: SummarySectionProps) => {
  const { handleSubmit } = useCustomMutation();
  const { activeStep, setActiveStep, type } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSaveAsTemplate,
    onOpen: onOpenSaveAsTemplate,
    onClose: onCloseSaveAsTemplate,
  } = useDisclosure();
  const planFormDetails = useAppSelector((state) => state.maintenance.planForm);
  const { isSuccess, isLoading } =
    useGetTemplateInfoBySystemContextTypeAndContextIdQuery(
      {
        systemContextTypeId: SYSTEM_CONTEXT_TYPE.MAINTENANCE_PLANS,
        contextId: planFormDetails?.planId,
      },
      { skip: !planFormDetails?.planId }
    );
  const [createMaintenancePlan, { isLoading: createLoading }] =
    useCreateMaintenancePlanWithSchedulesMutation();
  const [updateMaintenancePlan, { isLoading: updateLoading }] =
    useUpdateMaintenancePlanWithSchedulesMutation();
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const handleSaveAsTemplate = async (data: SaveAsTemplatePayload) => {
    setSaveAsTemplate(true);
    await handleSubmitPlan(true, data.templateName, data.templateDescription);
  };

  const generateCreatePayload = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const session = await getSession();
    const username = session?.user?.username;

    const PAYLOAD = {
      createMaintenancePlanDto: {
        ...generatePlanDTO(type, planFormDetails, username as string),
        saveAsTemplate,
        templateName,
        templateDescription,
      },
      createMaintenanceScheduleDtos: [
        ...planFormDetails.schedules.map((schedule: ScheduleFormDetails) => ({
          createMaintenanceScheduleDto: generateMaintenanceScheduleDTO(
            type,
            schedule,
            planFormDetails.updatedScheduleIDs,
            username as string
          ),
          createTaskDtos: (() => {
            const tasksArray = [
              ...generateTasksArray(
                schedule.tasks,
                schedule.updatedTaskIDs,
                username as string
              ),
            ];

            return tasksArray.length > 0 ? (tasksArray as TaskPayload[]) : null;
          })(),
        })),
      ],
    };
    return PAYLOAD;
  };

  const generateUpdatePayload = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const session = await getSession();
    const username = session?.user?.username;
    const PAYLOAD = {
      updateMaintenancePlanDto: {
        ...generatePlanDTO(type, planFormDetails, username as string),
        saveAsTemplate,
        templateName,
        templateDescription,
      },
      masterUpdateMaintenanceScheduleDto: [
        // Deleted schedules
        ...planFormDetails.deletedScheduleIDs.map((item) => ({
          updateMaintenanceScheduleDto: {
            scheduleId: item,
            actionType: FORM_ENUM.delete,
            changeInitiatedBy: username,
          },
        })),
        ...planFormDetails.schedules
          .filter(
            // Filter for schedules that has been added or updated
            (schedule) =>
              (schedule.scheduleId &&
                planFormDetails.updatedScheduleIDs.includes(
                  schedule.scheduleId
                )) ||
              schedule.scheduleId === null
          )
          .map((schedule: ScheduleFormDetails) => ({
            updateMaintenanceScheduleDto: generateMaintenanceScheduleDTO(
              type,
              schedule,
              planFormDetails.updatedScheduleIDs,
              username as string
            ),
            updateTaskDtos: (() => {
              const tasksArray = [
                // Deleted Task
                ...schedule.deletedTaskIDs.map((item) => ({
                  taskId: item,
                  actionType: FORM_ENUM.delete,
                  changeInitiatedBy: username,
                })),
                // Generate for only tasks that have been added or updated
                ...generateTasksArray(
                  schedule.tasks.filter(
                    (task) =>
                      (task.taskId &&
                        schedule.updatedTaskIDs.includes(task.taskId)) ||
                      task.taskId === null
                  ),
                  schedule.updatedTaskIDs,
                  username as string
                ),
              ];

              return tasksArray.length > 0
                ? (tasksArray as TaskPayload[])
                : null;
            })(),
          })),
      ],
    };
    return PAYLOAD;
  };

  const handleSubmitPlan = async (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    let response;
    const createPlanPayload = await generateCreatePayload(
      saveAsTemplate,
      templateName,
      templateDescription
    );
    const updatePlanPayload = await generateUpdatePayload(
      saveAsTemplate,
      templateName,
      templateDescription
    );
    if (type === 'create') {
      response = await handleSubmit(
        createMaintenancePlan,
        createPlanPayload,
        ''
      );
    }
    if (type === 'edit') {
      response = await handleSubmit(
        updateMaintenancePlan,
        updatePlanPayload,
        ''
      );
    }

    if (response?.data) {
      setSaveAsTemplate(false);
      onOpen();
    }
  };

  return (
    <>
      <Flex
        width="full"
        height="full"
        direction="column"
        display={activeStep === 3 ? 'flex' : 'none'}
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
            cancelLink={`/${ROUTES.MAINTENANCE}`}
            totalStep={3}
            activeStep={3}
            finalText={type === 'create' ? 'Save' : 'Save Changes'}
            setActiveStep={setActiveStep}
            handleContinue={() => handleSubmitPlan(false, '', '')}
            isLoading={saveAsTemplate ? false : createLoading || updateLoading}
            loadingText={createLoading ? 'Submitting...' : 'Updating...'}
          >
            {!isLoading ? (
              !isSuccess && (
                <Button
                  variant="outline"
                  customStyles={{ width: 'max-content' }}
                  handleClick={onOpenSaveAsTemplate}
                >
                  Save and Create Template
                </Button>
              )
            ) : (
              <></>
            )}
          </FormActionButtons>
        </Flex>
        {isOpen && (
          <PlanSuccessModal isOpen={isOpen} onClose={onClose} type={type} />
        )}
      </Flex>
      <SaveAsTemplateModal
        isOpen={isOpenSaveAsTemplate}
        onClose={onCloseSaveAsTemplate}
        handleSave={handleSaveAsTemplate}
        isLoading={createLoading || updateLoading}
      />
    </>
  );
};

export default SummarySection;

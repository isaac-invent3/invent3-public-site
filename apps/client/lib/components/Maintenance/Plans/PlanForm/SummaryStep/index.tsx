import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
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
  const { data } = useSession();
  const username = data?.user?.username;
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const handleSaveAsTemplate = (
    templateName: string,
    templateDescription: string
  ) => {
    setSaveAsTemplate(true);
    handleSubmitPlan(true, templateName, templateDescription);
  };

  const generatePayload = (
    saveAsTemplate: boolean,
    templateName?: string,
    templateDescription?: string
  ) => {
    const getDtoKey = (base: string) =>
      `${type === 'create' ? `create${base}Dto` : `update${base}Dto`}`;

    const PAYLOAD = {
      [getDtoKey('MaintenancePlan')]: {
        ...generatePlanDTO(type, planFormDetails, username as string),
        saveAsTemplate,
        templateName,
        templateDescription,
      },
      [type === 'create'
        ? 'createMaintenanceScheduleDtos'
        : 'masterUpdateMaintenanceScheduleDto']: [
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
            [getDtoKey('MaintenanceSchedule')]: generateMaintenanceScheduleDTO(
              type,
              schedule,
              planFormDetails.updatedScheduleIDs,
              username as string
            ),
            [type === 'create' ? 'createTaskDtos' : 'updateTaskDtos']: (() => {
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

              return tasksArray.length > 0 ? tasksArray : null;
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
    response = await handleSubmit(
      type === 'create' ? createMaintenancePlan : updateMaintenancePlan,
      generatePayload(saveAsTemplate, templateName, templateDescription),
      ''
    );

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
            cancelLink="/maintenance"
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

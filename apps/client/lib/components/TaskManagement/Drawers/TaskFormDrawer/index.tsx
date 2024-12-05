import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '~/lib/components/UI/Modal/ModalHeading';
import BackButton from '~/lib/components/UI/Button/BackButton';
import { taskBaseSchema } from '~/lib/schemas/task.schema';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '~/lib/redux/services/task/general.services';
import TaskSuccessModal from '../../Modals/TaskSuccessModal';
import { getSession } from 'next-auth/react';
import TaskDescription from '../../Common/TaskDescription';
import CostEstimate from '../../Common/CostEstimate';
import TaskAssignedTo from '../../Common/AssignedTo';
import TaskTitle from '../../Common/TaskTitle';
import TaskType from '../../Common/TaskType';
import TaskPriority from '../../Common/TaskPriority';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import EstimatedDuration from '../../Common/EstimatedDuration';
import {
  useCreateTaskInstanceMutation,
  useUpdateTaskInstanceMutation,
} from '~/lib/redux/services/task/instance.services';
import { INSTANCE_UPDATE_ENUM } from '~/lib/utils/constants';
import { useAppSelector } from '~/lib/redux/hooks';

interface TaskFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleData?: (task: taskFormDetails) => void;
  data?: taskFormDetails;
  scheduleId?: number | null;
  type?: 'main' | 'instance';
}
const TaskFormDrawer = (props: TaskFormDrawerProps) => {
  const {
    isOpen,
    onClose,
    handleData,
    data,
    scheduleId,
    type = 'main',
  } = props;
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const appConfigValues = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation({});
  const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation({});
  const [createTaskInstance, { isLoading: isCreatingTaskInstance }] =
    useCreateTaskInstanceMutation({});
  const [updateTaskInstance, { isLoading: isUpdatingTaskInstance }] =
    useUpdateTaskInstanceMutation({});

  const isLoading =
    isCreatingTask ||
    isUpdatingTask ||
    isCreatingTaskInstance ||
    isUpdatingTaskInstance;

  const isCreating = isCreatingTask || isCreatingTaskInstance;
  const isInstance = type === 'instance';

  const formik = useFormik({
    initialValues: {
      taskId: data?.taskId ?? null,
      taskTypeId: data?.taskTypeId ?? null,
      taskType: data?.taskType ?? null,
      taskName: data?.taskName ?? null,
      taskDescription: data?.taskDescription ?? undefined,
      priorityId: data?.priorityId ?? null,
      priorityName: data?.priorityName ?? null,
      taskStatusId: data?.statusId ?? null,
      taskStatusName: data?.status ?? null,
      assignedTo: data?.assignedTo ?? null,
      assignedToEmployeeName: data?.assignedToEmployeeName ?? null,
      estimatedDurationInHours:
        data?.estimatedDurationInHours ??
        (typeof appConfigValues.DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS ===
        'string'
          ? parseInt(
              appConfigValues.DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS,
              10
            )
          : null),
      costEstimate: data?.costEstimate ?? null,
      actualCost: data?.actualCost ?? null,
      comments: data?.comments ?? null,
    },
    validationSchema: taskBaseSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      if (handleData) {
        handleData({
          ...values,
          scheduleId: data?.scheduleId ?? null,
          localId: data?.localId ?? null,
          statusId: data?.statusId ?? null,
          status: data?.status ?? 'Not Started',
          assetId: data?.assetId ?? null,
          assetName: data?.assetName ?? null,
          assetLocation: data?.assetLocation ?? null,
          dateCompleted: data?.dateCompleted ?? null,
          priorityColorCode: null,
          statusColorCode: null,
        });
        resetForm();
        onOpenSuccess();
      } else if (scheduleId) {
        let response;
        const info = {
          taskTypeId: values.taskTypeId,
          [isInstance ? 'taskInstanceId' : 'taskId']: values.taskId,
          [isInstance ? 'taskInstanceName' : 'taskName']: values.taskName,
          taskDescription: values.taskDescription,
          priorityId: values.priorityId,
          assignedTo: values.assignedTo,
          estimatedDurationInHours: values.estimatedDurationInHours,
          costEstimate: values.costEstimate,
          actualCost: values.actualCost,
          comments: values.comments,
          [isInstance ? 'scheduleInstanceId' : 'scheduleId']: scheduleId,
          ...(isInstance
            ? {
                parentTaskId: data?.parentTaskId,
                updateType: INSTANCE_UPDATE_ENUM.ONLY_THIS_INSTANCE,
              }
            : {}),
        };
        if (data) {
          response = await handleSubmit(
            type === 'main' ? updateTask : updateTaskInstance,
            {
              ...info,
              id: values.taskId,
              lastModifiedBy: session?.user?.username,
            },
            ''
          );
        } else {
          response = await handleSubmit(
            type === 'main' ? createTask : createTaskInstance,
            { ...info, createdBy: session?.user.username },
            ''
          );
        }
        if (response?.data) {
          resetForm();
          onOpenSuccess();
        }
      }
    },
  });

  const handleCloseSuccessModal = (addAnotherTask: boolean) => {
    onCloseSuccess();
    if (!addAnotherTask) {
      onClose();
    }
  };

  return (
    <>
      <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="681px">
        <DrawerHeader
          p={0}
          m={0}
          px="32px"
          mt="20px"
          mb="10px"
          width="max-content"
        >
          <BackButton handleClick={onClose} />
        </DrawerHeader>
        <DrawerBody p={0} m={0}>
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px="32px"
                pb="32px"
                pt="50px"
                spacing={0}
                alignItems="flex-start"
              >
                <ModalHeading heading={data ? 'Edit Task' : 'Add New Task'} />

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="27px" mt="60px">
                  <TaskTitle sectionMaxWidth="118px" spacing="73px" />
                  <TaskDescription sectionMaxWidth="118px" spacing="73px" />
                  <TaskType sectionMaxWidth="118px" spacing="73px" />
                  <TaskPriority sectionMaxWidth="118px" spacing="73px" />
                  <EstimatedDuration sectionMaxWidth="118px" spacing="73px" />
                  <CostEstimate sectionMaxWidth="118px" spacing="73px" />
                  <TaskAssignedTo sectionMaxWidth="118px" spacing="73px" />
                </VStack>
                {/* Main Form Ends Here */}
              </VStack>
            </form>
          </FormikProvider>
        </DrawerBody>
        <DrawerFooter pb="38px">
          <HStack width="full" spacing="16px" justifyContent="flex-end">
            <Button
              variant="secondary"
              customStyles={{ width: '138px' }}
              handleClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              customStyles={{ width: '237px' }}
              isLoading={isLoading || formik.isSubmitting}
              loadingText={isCreating ? 'Creating...' : 'Updating...'}
              handleClick={formik.handleSubmit}
            >
              Save Task
            </Button>
          </HStack>
        </DrawerFooter>
      </GenericDrawer>
      <TaskSuccessModal
        isOpen={isOpenSuccess}
        onClose={handleCloseSuccessModal}
        type={data ? 'edit' : 'create'}
        format="modal"
      />
    </>
  );
};

export default TaskFormDrawer;

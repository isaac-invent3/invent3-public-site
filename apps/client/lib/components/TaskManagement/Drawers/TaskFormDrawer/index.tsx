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
import { useSession } from 'next-auth/react';
import TaskDescription from '../../Common/TaskDescription';
import CostEstimate from '../../Common/CostEstimate';
import TaskAssignedTo from '../../Common/AssignedTo';
import TaskTitle from '../../Common/TaskTitle';
import TaskType from '../../Common/TaskType';
import TaskPriority from '../../Common/TaskPriority';
import GenericDrawer from '~/lib/components/UI/GenericDrawer';
import EstimatedDuration from '../../Common/EstimatedDuration';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleData?: (task: taskFormDetails) => void;
  data?: taskFormDetails;
  scheduleId?: number | null;
}
const TaskFormModal = (props: TaskFormModalProps) => {
  const { isOpen, onClose, handleData, data, scheduleId } = props;
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation({});
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

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
      estimatedDurationInHours: data?.estimatedDurationInHours ?? null,
      costEstimate: data?.costEstimate ?? null,
      actualCost: data?.actualCost ?? null,
      comments: data?.comments ?? null,
    },
    validationSchema: taskBaseSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (scheduleId) {
        let response;
        const info = {
          taskTypeId: values.taskTypeId,
          taskName: values.taskName,
          taskDescription: values.taskDescription,
          priorityId: values.priorityId,
          assignedTo: values.assignedTo,
          estimatedDurationInHours: values.estimatedDurationInHours,
          costEstimate: values.costEstimate,
          actualCost: values.actualCost,
          comments: values.comments,
          scheduleId: scheduleId,
        };
        if (data) {
          response = await handleSubmit(
            updateTask,
            {
              ...info,
              id: values.taskId,
              taskId: values.taskId,
              lastModifiedBy: session?.user.id,
            },
            ''
          );
        } else {
          response = await handleSubmit(
            createTask,
            { ...info, createdBy: session?.user.id },
            ''
          );
        }
        if (response?.data) {
          resetForm();
          onOpenSuccess();
        }
      }
      if (handleData) {
        handleData({
          ...values,
          scheduleId: scheduleId ?? null,
          statusId: null,
          status: 'Not Started',
          assetId: null,
          assetName: null,
          assetLocation: null,
          dateCompleted: null,
          localId: null,
        });
        resetForm();
        onOpenSuccess();
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
              isLoading={isCreating || isUpdating}
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

export default TaskFormModal;

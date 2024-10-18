/* eslint-disable no-unused-vars */
import { Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import TextInput from '~/lib/components/UI/TextInput';
import ModalHeading from '~/lib/components/UI/ModalHeading';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import BackButton from '~/lib/components/UI/Button/BackButton';
import TaskPriority from './TaskPriority';
import TextareaInput from '~/lib/components/UI/TextArea';
import TaskType from './TaskType';
import { taskBaseSchema } from '~/lib/schemas/task.schema';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import TaskAssignedTo from './AssignedTo';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '~/lib/redux/services/task/general.services';
import TaskSuccessModal from '../TaskSuccessModal';
import { useSession } from 'next-auth/react';
import moment from 'moment';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
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
      dueDate: data?.dueDate ?? null,
      dateCompleted: data?.dateCompleted ?? null,
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
          dueDate: moment(values.dueDate, 'DD/MM/YYYY').utcOffset(0, true),
          dateCompleted: moment(values.dateCompleted, 'DD/MM/YYYY').utcOffset(
            0,
            true
          ),
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
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '681px' }, rounded: 'none' }}
      >
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              px="32px"
              pt="20px"
              pb="32px"
              spacing={0}
              alignItems="flex-start"
            >
              <BackButton handleClick={onClose} customStyles={{ mb: '60px' }} />
              <ModalHeading heading={data ? 'Edit Task' : 'Add New Task'} />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="27px" mt="60px">
                <HStack width="full" alignItems="flex-start" spacing="73px">
                  <Flex width="full" maxW="118px">
                    <SectionInfo
                      title="Task Title"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  <Field
                    as={TextInput}
                    name="taskName"
                    type="text"
                    label="Task Title"
                  />
                </HStack>
                <HStack width="full" alignItems="flex-start" spacing="73px">
                  <Flex width="full" maxW="118px">
                    <SectionInfo
                      title="Description"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  <Field
                    as={TextareaInput}
                    name="taskDescription"
                    type="text"
                    label="Description"
                    placeholder="Description"
                    customStyle={{ height: '133px' }}
                  />
                </HStack>
                <TaskType />
                <TaskPriority />
                <HStack width="full" alignItems="flex-start" spacing="73px">
                  <Flex width="full" maxW="118px">
                    <SectionInfo
                      title="Due Date"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>

                  <CustomDatePicker
                    name="dueDate"
                    label="Due Date"
                    type="date"
                  />
                </HStack>
                <HStack width="full" alignItems="flex-start" spacing="73px">
                  <Flex width="full" maxW="118px">
                    <SectionInfo
                      title="Completion Date"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>

                  <CustomDatePicker
                    name="dateCompleted"
                    label="Completion Date"
                    type="date"
                  />
                </HStack>
                <HStack width="full" alignItems="flex-start" spacing="73px">
                  <Flex width="full" maxW="118px">
                    <SectionInfo
                      title="Cost Estimate"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  <Field
                    as={TextInput}
                    name="costEstimate"
                    type="number"
                    label="Cost Estimate"
                  />
                </HStack>
                <TaskAssignedTo />
              </VStack>
              {/* Main Form Ends Here */}
              <HStack
                width="full"
                spacing="16px"
                justifyContent="flex-end"
                mt="16px"
              >
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
                >
                  Save Task
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </GenericModal>
      <TaskSuccessModal
        isOpen={isOpenSuccess}
        onClose={handleCloseSuccessModal}
        type={data ? 'edit' : 'create'}
      />
    </>
  );
};

export default TaskFormModal;

/* eslint-disable no-unused-vars */
import { Flex, HStack, VStack } from '@chakra-ui/react';
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

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleData?: (task: taskFormDetails) => void;
  data?: taskFormDetails;
}
const TaskFormModal = (props: TaskFormModalProps) => {
  const { isOpen, onClose, handleData, data } = props;
  // const { handleSubmit } = useCustomMutation();

  const formik = useFormik({
    initialValues: {
      taskId: data?.taskId ?? null,
      taskTypeId: data?.taskTypeId ?? null,
      taskTypeName: data?.taskTypeName ?? null,
      taskName: data?.taskName ?? null,
      taskDescription: data?.taskDescription ?? null,
      priorityId: data?.priorityId ?? null,
      priorityName: data?.priorityName ?? null,
      taskStatusId: data?.taskStatusId ?? null,
      taskStatusName: data?.taskStatusName ?? null,
      assignedTo: data?.assignedTo ?? null,
      assignedToName: data?.assignedToName ?? null,
      dueDate: data?.dueDate ?? null,
      dateCompleted: data?.dateCompleted ?? null,
      costEstimate: data?.costEstimate ?? null,
      actualCost: data?.actualCost ?? null,
      comments: data?.comments ?? null,
    },
    validationSchema: taskBaseSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (handleData) {
        handleData({ ...values, taskStatusName: 'Not Started' });
      }
      resetForm();
      onClose();
    },
  });

  return (
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
            <ModalHeading heading="Add New Task" subheading="" />

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

                <CustomDatePicker name="dueDate" label="Due Date" type="date" />
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
              <Button type="submit" customStyles={{ width: '237px' }}>
                Save Task
              </Button>
            </HStack>
          </VStack>
        </form>
      </FormikProvider>
    </GenericModal>
  );
};

export default TaskFormModal;

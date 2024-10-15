import { Flex, HStack, VStack } from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import TextInput from '~/lib/components/UI/TextInput';
import { useCreateMaintenancePlanMutation } from '~/lib/redux/services/maintenance/plan.services';
import ModalHeading from '~/lib/components/UI/ModalHeading';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import CustomDatePicker from '~/lib/components/UI/Form/FormDatePicker';
import BackButton from '~/lib/components/UI/Button/BackButton';
import TaskPriority from './TaskPriority';
import TextareaInput from '~/lib/components/UI/TextArea';
import TaskType from './TaskType';
import { taskSchema } from '~/lib/schemas/task.schema';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TaskFormModal = (props: TaskFormModalProps) => {
  const { isOpen, onClose } = props;
  const [createPlan, { isLoading }] = useCreateMaintenancePlanMutation({});
  const { handleSubmit } = useCustomMutation();
  const { data } = useSession();

  const formik = useFormik({
    initialValues: {
      taskTypeId: null,
      taskName: null,
      taskDescription: null,
      priorityId: null,
      taskStatusId: null,
      assignedTo: null,
      dueDate: null,
      dateCompleted: null,
      costEstimate: null,
      actualCost: null,
      comments: null,
      scheduleId: null,
    },
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const finalValue = { ...values, createdBy: data?.user?.username };
      const response = await handleSubmit(createPlan, finalValue, '');
      if (response?.data) {
        onClose();
      }
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

                <CustomDatePicker
                  name="dueDate"
                  label="Due Date"
                  type="datetime"
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
                  type="datetime"
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
                isLoading={isLoading}
              >
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

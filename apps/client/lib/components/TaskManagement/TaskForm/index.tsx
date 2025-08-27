'use client';

import { Divider, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';

import { useAppSelector } from '~/lib/redux/hooks';
import { taskSchema } from '~/lib/schemas/task.schema';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '~/lib/redux/services/task/general.services';
import TaskSuccessModal from '../Modals/TaskSuccessModal';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { FormActionButtons } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';
import { ROUTES } from '~/lib/utils/constants';
import withFormLeaveDialog from '../../UI/FormLeaveDialogProvider';

interface TaskFormProps {
  type: 'create' | 'edit';
}
const TaskForm = (props: TaskFormProps) => {
  const { type } = props;
  const formDetails = useAppSelector((state) => state.task.taskForm);
  const appConfigValues = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation({});
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

  const defaultHeader = type === 'create' ? 'Add New Task' : 'Edit Task';

  const formik = useFormik({
    initialValues: {
      scheduleId: formDetails?.scheduleId ?? null,
      taskId: formDetails?.taskId ?? null,
      taskTypeId: formDetails?.taskTypeId ?? null,
      taskType: formDetails?.taskType ?? null,
      taskName: formDetails?.taskName ?? null,
      taskDescription: formDetails?.taskDescription ?? undefined,
      priorityId: formDetails?.priorityId ?? null,
      priorityName: formDetails?.priorityName ?? null,
      taskStatusId: formDetails?.statusId ?? null,
      taskStatusName: formDetails?.status ?? null,
      assignedTo: formDetails?.assignedTo ?? null,
      assignedToEmployeeName: formDetails?.assignedToEmployeeName ?? null,
      costEstimate: formDetails?.costEstimate ?? null,
      estimatedDurationInHours:
        formDetails?.estimatedDurationInHours ??
        (typeof appConfigValues.DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS ===
        'string'
          ? parseInt(
              appConfigValues.DEFAULT_ESTIMATED_TASK_DURATION_IN_HOURS,
              10
            )
          : null),
      actualCost: formDetails?.actualCost ?? null,
      comments: formDetails?.comments ?? null,
      document: formDetails?.document ?? null,
    },
    validationSchema: taskSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();
      let response;
      const info = {
        taskTypeId: values.taskTypeId!,
        taskName: values.taskName!,
        taskDescription: values.taskDescription!,
        priorityId: values.priorityId!,
        assignedTo: values.assignedTo!,
        costEstimate: values.costEstimate!,
        comments: values.comments,
        scheduleId: values.scheduleId!,
        estimatedDurationInHours: values.estimatedDurationInHours!,
        document: values.document,
      };
      if (type === 'edit') {
        response = await handleSubmit(
          updateTask,
          {
            ...info,
            taskId: values.taskId!,
            actualCost: values.actualCost!,
            lastModifiedBy: session?.user?.username!,
          },
          ''
        );
      } else {
        const { document, ...taskPayload } = info;
        response = await handleSubmit(
          createTask,
          {
            createTaskDto: {
              ...taskPayload,
              createdBy: session?.user.username!,
            },
            createTaskDocumentDto: values.document
              ? [
                  {
                    documentName: document?.documentName!,
                    base64Document: document?.base64Document!,
                  },
                ]
              : null,
            createTaskDocumentsLinkDtos: null,
          },
          ''
        );
      }
      if (response?.data) {
        resetForm();
        onOpenSuccess();
      }
    },
  });

  return (
    <Flex
      width="full"
      direction="column"
      pb="24px"
      px={{ base: '16px', md: 0 }}
    >
      <PageHeader>{defaultHeader}</PageHeader>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack
            spacing="32px"
            width="full"
            alignItems="flex-start"
            bgColor="white"
            pt="37px"
            pl="16px"
            pb="33px"
            pr={{ base: '16px', md: '30px' }}
            mt="40px"
            rounded="6px"
            minH="60vh"
            divider={<Divider borderColor="#BBBBBB" />}
            overflow="hidden"
          >
            <SectionOne />
            <SectionTwo />
          </VStack>
          <Flex width="full" mt="16px">
            <FormActionButtons
              type="submit"
              cancelLink={`/${ROUTES.TASKS}`}
              totalStep={1}
              activeStep={1}
              loadingText={isCreating ? 'Creating...' : 'Updating...'}
              isLoading={isCreating || isUpdating || formik.isSubmitting}
            />
          </Flex>
        </form>
      </FormikProvider>
      <TaskSuccessModal
        isOpen={isOpenSuccess}
        onClose={onCloseSuccess}
        type={type === 'edit' ? 'edit' : 'create'}
        format="page"
      />
    </Flex>
  );
};

export default withFormLeaveDialog(TaskForm);

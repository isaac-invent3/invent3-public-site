import {
  Heading,
  HStack,
  ModalBody,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import GenericAsyncSelect from '~/lib/components/UI/GenericAsyncSelect';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateTaskInstanceMetadataIdsMutation } from '~/lib/redux/services/task/instance.services';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { updateTaskInstanceMetadataSchema } from '~/lib/schemas/task.schema';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';

interface UpdateMultipleTaskModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: () => void;
  selectedTaskIds: number[];
}

const UpdateMultipleTaskModal = (props: UpdateMultipleTaskModalProps) => {
  const { isOpen, onClose, selectedTaskIds } = props;
  const { handleSubmit } = useCustomMutation();
  const toast = useToast();
  const [pageNumber, setPageNumber] = useState(1);

  const [updateTaskInstanceMetadata, { isLoading: isUpdating }] =
    useUpdateTaskInstanceMetadataIdsMutation({});

  const { data: taskStatuses, isLoading: isFetchingTaskStatuses } =
    useGetAllTaskStatusesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const { data: taskPriorities, isLoading: isFetchingTaskPriorities } =
    useGetAllTaskPrioritiesQuery({
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: 1,
    });

  const formik = useFormik({
    initialValues: {
      taskStatusId: undefined,
      taskPriorityId: undefined,
      assignedToId: undefined,
      taskInstanceIds: selectedTaskIds,
    },
    validationSchema: updateTaskInstanceMetadataSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();

      const info = {
        ...values,
        lastModifiedBy: session?.user.username!,
      };

      const response = await handleSubmit(updateTaskInstanceMetadata, info, '');

      if (response?.data) {
        toast({
          title: 'Tasks Updated Successfully',
          status: 'success',
          position: 'top-right',
        });
      }
    },
  });

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '606px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px="32px"
                pt="56px"
                pb="34px"
                spacing="48px"
                alignItems="center"
              >
                <VStack spacing="8px">
                  <Heading
                    fontWeight={800}
                    fontSize="32px"
                    lineHeight="38.02px"
                    color="primary.500"
                  >
                    Update Tasks
                  </Heading>
                  <Text color="neutral.700" size="md">
                    Kindly fill the Fields below you want to update the Task(s)
                    to
                  </Text>
                </VStack>

                {/* Main Form Starts Here */}
                <HStack width="full" spacing="24px">
                  <GenericAsyncSelect
                    selectName="taskStatusId"
                    selectTitle="Status"
                    data={taskStatuses}
                    labelKey="statusName"
                    valueKey="taskStatusId"
                    isLoading={isFetchingTaskStatuses}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />

                  <GenericAsyncSelect
                    selectName="taskPriorityId"
                    selectTitle="Priority"
                    data={taskPriorities}
                    labelKey="priority"
                    valueKey="taskPriorityId"
                    isLoading={isFetchingTaskPriorities}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </HStack>
                {/* Main Form Ends Here */}
                <HStack width="full" spacing="24px" justifyContent="center">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '96px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    customStyles={{ width: '193px' }}
                    isLoading={isUpdating || formik.isSubmitting}
                  >
                    Continue
                  </Button>
                </HStack>
              </VStack>
            </form>
          </FormikProvider>
        </ModalBody>
      </GenericModal>
    </>
  );
};

export default UpdateMultipleTaskModal;

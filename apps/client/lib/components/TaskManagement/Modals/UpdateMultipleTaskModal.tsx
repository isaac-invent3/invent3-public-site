import {
  Flex,
  Grid,
  HStack,
  ModalBody,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {
  Button,
  FormSectionInfo,
  GenericModal,
  ModalHeading,
} from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useGetTaskInstancesByListOfIdsQuery,
  useUpdateTaskInstanceMetadataIdsMutation,
} from '~/lib/redux/services/task/instance.services';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { updateTaskInstanceMetadataSchema } from '~/lib/schemas/task.schema';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import GenericAsyncSelect from '../../UI/GenericAsyncSelect';
import TaskInstanceTable from '../Tables/TaskInstanceTable';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

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

  const { data, isLoading, isFetching } = useGetTaskInstancesByListOfIdsQuery({
    pageSize,
    pageNumber: currentPage,
    taskInstanceIds: selectedTaskIds,
  });

  const formik = useFormik({
    initialValues: {
      taskStatusId: undefined,
      taskPriorityId: undefined,
      assignedTo: undefined,
      assignedToEmployeeName: '',
      taskInstanceIds: selectedTaskIds,
    },
    validationSchema: updateTaskInstanceMetadataSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      // eslint-disable-next-line no-unused-vars
      const { assignedToEmployeeName: _, ...payload } = values;

      const response = await handleSubmit(
        updateTaskInstanceMetadata,
        {
          ...payload,
          lastModifiedBy: session?.user.username!,
        },
        ''
      );

      if (response?.data) {
        resetForm();

        onClose();

        toast({
          title: 'Tasks Updated Successfully',
          status: 'success',
          position: 'top-right',
        });
      }
    },
  });

  const { values, setFieldValue } = formik;

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ maxW: '80vw', width: '1116px', height: '716px' }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px="24px"
                py="32px"
                spacing="48px"
                alignItems="center"
              >
                <ModalHeading heading="Bulk Task Update" />

                <HStack width="full" alignItems="flex-start" spacing="64px">
                  <Flex width="full" maxW="118px">
                    <FormSectionInfo
                      title="Bulk Tasks"
                      info="List of tasks to be updated."
                      isRequired={false}
                    />
                  </Flex>

                  <VStack width="full" spacing="27px" overflow="auto">
                    <VStack width="full" spacing="8px" overflow="auto">
                      <TaskInstanceTable
                        data={data?.data?.items ?? []}
                        totalPages={data?.data?.totalPages}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        setPageNumber={setCurrentPage}
                        pageNumber={currentPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        isSortable={true}
                        emptyLines={3}
                        showPopover={false}
                        type="page"
                      />
                    </VStack>
                  </VStack>
                </HStack>

                <Grid
                  templateColumns={{
                    base: '1fr',
                    md: 'repeat(3, 1fr)',
                  }}
                  gap="32px"
                  mt={10}
                  width="full"
                  height="full"
                  paddingTop="2rem"
                  borderTop="1px solid #BBBBBB"
                >
                  <VStack spacing="12px" alignItems="flex-start">
                    <Text
                      color="#42403D"
                      fontWeight="700"
                      lineHeight="19.01px"
                      fontSize="16px"
                      borderBottom="0.7px solid #BBBBBB"
                      paddingBottom="5px"
                      width="full"
                    >
                      New Status
                    </Text>

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
                  </VStack>

                  <VStack spacing="12px" alignItems="flex-start">
                    <Text
                      color="#42403D"
                      fontWeight="700"
                      lineHeight="19.01px"
                      fontSize="16px"
                      borderBottom="0.7px solid #BBBBBB"
                      paddingBottom="5px"
                      width="full"
                    >
                      New Priority
                    </Text>

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
                  </VStack>

                  <VStack spacing="12px" alignItems="flex-start">
                    <Text
                      color="#42403D"
                      fontWeight="700"
                      lineHeight="19.01px"
                      fontSize="16px"
                      borderBottom="0.7px solid #BBBBBB"
                      paddingBottom="5px"
                      width="full"
                    >
                      New Owner
                    </Text>

                    <UserDisplayAndAddButton
                      selectedUser={values?.assignedToEmployeeName}
                      handleSelectUser={(user) => {
                        setFieldValue('assignedTo', user?.value ?? null);
                        setFieldValue(
                          'assignedToEmployeeName',
                          user?.label ?? null
                        );
                      }}
                    />
                  </VStack>
                </Grid>

                {/* Main Form Ends Here */}
                <HStack width="full" spacing="24px" justifyContent="flex-end">
                  <Button
                    variant="secondary"
                    customStyles={{ width: '100px' }}
                    handleClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    customStyles={{ width: '100px' }}
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

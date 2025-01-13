'use client';

import {
  Flex,
  Grid,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Button, FormSectionInfo } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
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
import { getSelectedTaskIds, removeSelectedTaskIds } from '../Common/utils';
import TaskInstanceTable from '../Tables/TaskInstanceTable';

const BulkTaskUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [updateTaskInstanceMetadata, { isLoading }] =
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

  const {
    data,
    isLoading: taskInstanceLoading,
    isFetching,
  } = useGetTaskInstancesByListOfIdsQuery({
    pageSize,
    pageNumber: currentPage,
    taskInstanceIds: getSelectedTaskIds(),
  });

  const formik = useFormik({
    initialValues: {
      taskStatusId: undefined,
      taskPriorityId: undefined,
      assignedTo: undefined,
      assignedToEmployeeName: '',
    },
    validationSchema: updateTaskInstanceMetadataSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      const { assignedToEmployeeName: _, ...payload } = values;

      const formValues = {
        ...payload,
        lastModifiedBy: session?.user.username!,
        taskInstanceIds: getSelectedTaskIds(),
      };

      const response = await handleSubmit(
        updateTaskInstanceMetadata,
        formValues,
        ''
      );

      if (response?.data) {
        removeSelectedTaskIds();
        resetForm();
        onOpen();
      }
    },
  });

  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Bulk Task Update</PageHeader>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
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
                    isLoading={taskInstanceLoading}
                    isFetching={isFetching}
                    setPageNumber={setCurrentPage}
                    pageNumber={currentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    isSortable={true}
                    emptyLines={pageSize}
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
                  selectedUser={formik.values?.assignedToEmployeeName}
                  handleSelectUser={(user) => {
                    formik.setFieldValue('assignedTo', user?.value ?? null);
                    formik.setFieldValue(
                      'assignedToEmployeeName',
                      user?.label ?? null
                    );
                  }}
                />
              </VStack>
            </Grid>

            <HStack spacing="16px" justifyContent="flex-end" width="full">
              <HStack
                as="button"
                px="16px"
                rounded="8px"
                bgColor="#F6F6F6B2"
                minH="50px"
                minW="96px"
                justifyContent="center"
              >
                <Text size="md" color="primary.500">
                  Cancel
                </Text>
              </HStack>

              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={formik.isSubmitting || isLoading}
                isDisabled={getSelectedTaskIds().length < 1}
              >
                Bulk Update
              </Button>
            </HStack>
          </Flex>
        </form>
      </FormikProvider>
    </Flex>
  );
};

export default BulkTaskUpdate;

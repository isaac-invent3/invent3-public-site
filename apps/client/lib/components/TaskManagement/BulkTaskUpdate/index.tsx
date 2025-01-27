'use client';

import { Flex, Grid, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { Button, FormSectionInfo } from '@repo/ui/components';
import { FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import PageHeader from '~/lib/components/UI/PageHeader';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import {
  useGetTaskInstancesByListOfIdsQuery,
  useUpdateTaskInstanceMetadataIdsMutation,
} from '~/lib/redux/services/task/instance.services';
import { updateTaskInstanceMetadataSchema } from '~/lib/schemas/task.schema';
import { ROUTES } from '~/lib/utils/constants';
import UserDisplayAndAddButton from '../../Common/UserDisplayAndAddButton';
import { getSelectedTaskIds, removeSelectedTaskIds } from '../Common/utils';
import TaskSuccessModal from '../Modals/TaskSuccessModal';
import TaskInstanceTable from '../Tables/TaskInstanceTable';
import DetailHeader from '../../UI/DetailHeader';
import TaskPrioritySelect from '../../Common/SelectComponents/TaskPrioritySelect';
import TaskStatusSelect from '../../Common/SelectComponents/TaskStatusSelect';

const BulkTaskUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useCustomMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const router = useRouter();

  const [updateTaskInstanceMetadata, { isLoading }] =
    useUpdateTaskInstanceMetadataIdsMutation({});

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
      taskInstanceIds: getSelectedTaskIds(),
    },
    validationSchema: updateTaskInstanceMetadataSchema,
    onSubmit: async (values, { resetForm }) => {
      const session = await getSession();

      // eslint-disable-next-line no-unused-vars
      const { assignedToEmployeeName, ...payload } = values;

      const formValues = {
        ...payload,
        lastModifiedBy: session?.user.username!,
      };

      const response = await handleSubmit(
        updateTaskInstanceMetadata,
        formValues,
        ''
      );

      if (response?.data) {
        resetForm();
        onOpen();
      }
    },
  });

  const submitButtonDisabled = useMemo(() => {
    return (
      getSelectedTaskIds().length < 1 ||
      (!formik.values.taskPriorityId &&
        !formik.values.taskStatusId &&
        !formik.values.assignedTo)
    );
  }, [formik]);

  const handleClose = () => {
    removeSelectedTaskIds();
    onClose();
    router.push(`/${ROUTES.TASKS}`);
  };

  return (
    <Flex width="full" direction="column" pb="24px">
      <PageHeader>Bulk Task Update</PageHeader>
      <FormikProvider value={formik}>
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
          <Flex width="full" direction="column" gap="24px" mt="32px">
            <Flex
              width="full"
              py="32px"
              px="25px"
              direction="column"
              gap="50px"
              rounded="6px"
              bgColor="white"
            >
              <HStack width="full" alignItems="flex-start" spacing="16px">
                <Flex width="full" maxW="118px">
                  <FormSectionInfo
                    title="Bulk Tasks"
                    info="List of tasks to be updated."
                    isRequired={false}
                  />
                </Flex>
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
                  showFooter={data?.data?.totalPages === 1 ? false : true}
                  type="page"
                />
              </HStack>

              <Grid
                templateColumns={{
                  base: '1fr',
                  md: 'repeat(3, 1fr)',
                }}
                gap="32px"
                width="full"
                height="full"
              >
                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    Assign To
                  </DetailHeader>
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
                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    New Status
                  </DetailHeader>
                  <TaskStatusSelect
                    selectTitle="Status"
                    selectName="taskStatusId"
                  />
                </VStack>

                <VStack spacing="12px" alignItems="flex-start">
                  <DetailHeader
                    variant="secondary"
                    customStyles={{ size: 'lg', fontWeight: 700 }}
                  >
                    New Priority
                  </DetailHeader>
                  <TaskPrioritySelect
                    selectTitle="Priority"
                    selectName="taskPriorityId"
                  />
                </VStack>
              </Grid>
            </Flex>

            <HStack spacing="16px" justifyContent="flex-end" width="full">
              <Button
                type="button"
                customStyles={{ width: '96px', bgColor: '#F6F6F6B2' }}
                variant="secondary"
                handleClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                customStyles={{ width: '161px' }}
                isLoading={formik.isSubmitting || isLoading}
                isDisabled={submitButtonDisabled}
              >
                Bulk Update
              </Button>
            </HStack>
          </Flex>
        </form>
      </FormikProvider>

      {isOpen && (
        <TaskSuccessModal
          isOpen={isOpen}
          onClose={handleClose}
          format="modal"
          type="edit"
          text="Bulk Task Update Request Successful"
        />
      )}
    </Flex>
  );
};

export default BulkTaskUpdate;

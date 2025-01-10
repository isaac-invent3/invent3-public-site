import { Flex, HStack, ModalBody, useToast, VStack } from '@chakra-ui/react';
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
import { useUpdateTaskInstanceMetadataIdsMutation } from '~/lib/redux/services/task/instance.services';
import { useGetAllTaskPrioritiesQuery } from '~/lib/redux/services/task/priorities.services';
import { useGetAllTaskStatusesQuery } from '~/lib/redux/services/task/statuses.services';
import { updateTaskInstanceMetadataSchema } from '~/lib/schemas/task.schema';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import PlanList from '../../AssetManagement/AssetForm/MaintenancePlanStep/PlanList';

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
                      title="Maintenance Plan"
                      info="Specify the Plan for asset upkeep"
                      isRequired={false}
                    />
                  </Flex>

                  <VStack width="full" spacing="27px" overflow="auto">
                    <VStack width="full" spacing="8px" overflow="auto">
                      <PlanList />
                    </VStack>
                  </VStack>
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

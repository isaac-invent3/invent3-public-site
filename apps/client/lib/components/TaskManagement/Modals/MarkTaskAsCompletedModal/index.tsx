import { useAppFormik } from '~/lib/hooks/useAppFormik';
import {
  Heading,
  HStack,
  ModalBody,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider } from 'formik';

import {
  Button,
  FormInputWrapper,
  FormTextInput,
  GenericModal,
} from '@repo/ui/components';
import { markTaskAsCompletedSchema } from '~/lib/schemas/task.schema';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { getSession } from 'next-auth/react';
import MarkAsCompletedSuccessModal from './SuccessModal';
import { useUpdateTaskInstanceMutation } from '~/lib/redux/services/task/instance.services';
import { useAppSelector } from '~/lib/redux/hooks';

interface MarkTaskAsCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeDrawer: () => void;
  data?: TaskInstance;
}
const MarkTaskAsCompletedModal = (props: MarkTaskAsCompletedModalProps) => {
  const { isOpen, onClose, data, closeDrawer } = props;
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskInstanceMutation(
    {}
  );
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );

  const formik = useAppFormik({
    initialValues: {
      actualCost: null,
    },
    validationSchema: markTaskAsCompletedSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const session = await getSession();
      let response;
      const info = {
        taskInstanceId: data?.taskInstanceId!,
        taskTypeId: data?.taskTypeId!,
        taskInstanceName: data?.taskInstanceName!,
        description: data?.taskDescription!,
        priorityId: data?.taskPriorityId!,
        taskStatusId: +appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID!,
        assignedTo: data?.assignedTo!,
        costEstimate: data?.costEstimate!,
        actualCost: values?.actualCost!,
        scheduleInstanceId: data?.scheduleInstanceId!,
        parentTaskId: data?.parentTaskId!,
        estimatedDurationInHours: data?.estimatedDurationInHours!,
        lastModifiedBy: session?.user.username!,
      };
      response = await handleSubmit(
        updateTask,
        info,
        // 'Task Marked as Completed Successfully!'
        ''
      );
      if (response?.data) {
        onOpenSuccess();
      }
    },
  });

  const handleCloseSuccessModal = () => {
    onCloseSuccess();
    onClose();
    closeDrawer();
  };

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
        <ModalBody p={0} m={0} width="full">
          <FormikProvider value={formik}>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack
                width="full"
                px={{ base: '16px', lg: '32px' }}
                pt="56px"
                pb="34px"
                spacing="56px"
                alignItems="center"
              >
                <VStack width="full" spacing="8px" alignItems="center">
                  <Heading
                    fontWeight={800}
                    size={{ base: 'lg', lg: 'xl' }}
                    color="primary.500"
                    textAlign="center"
                  >
                    Mark as completed?
                  </Heading>
                  <Text color="neutral.700" fontWeight={400}>
                    You are about to mark this{' '}
                    <Text as="span" fontWeight={800}>
                      {data?.taskInstanceId}
                    </Text>{' '}
                    as completed
                  </Text>
                </VStack>

                {/* Main Form Starts Here */}
                <VStack width="full" spacing="24px">
                  <Text color="neutral.700" fontWeight={400}>
                    Kindly specify how much is the actual cost of completing
                    this task
                  </Text>
                  <FormInputWrapper
                    title="Actual Cost"
                    description="Enter the actual cost for this task"
                    isRequired
                    customSpacing="31px"
                    sectionMaxWidth="132px"
                  >
                    <Field
                      as={FormTextInput}
                      name="actualCost"
                      type="number"
                      label="Actual"
                    />
                  </FormInputWrapper>
                </VStack>
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
      {data && isOpenSuccess && (
        <MarkAsCompletedSuccessModal
          isOpen={isOpenSuccess}
          onClose={handleCloseSuccessModal}
          id={data.taskInstanceId}
        />
      )}
    </>
  );
};

export default MarkTaskAsCompletedModal;

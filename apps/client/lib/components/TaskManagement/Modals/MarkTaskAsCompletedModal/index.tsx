import {
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Field, FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import TextInput from '~/lib/components/UI/TextInput';
import SectionInfo from '~/lib/components/UI/Form/FormSectionInfo';
import { markTaskAsCompletedSchema } from '~/lib/schemas/task.schema';
import { Task } from '~/lib/interfaces/task.interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useUpdateTaskMutation } from '~/lib/redux/services/task/general.services';
import { useSession } from 'next-auth/react';
import MarkAsCompletedSuccessModal from './SuccessModal';

interface MarkTaskAsCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Task;
}
const MarkTaskAsCompletedModal = (props: MarkTaskAsCompletedModalProps) => {
  const { isOpen, onClose, data } = props;
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  const {
    isOpen: isOpenSuccess,
    onOpen: onOpenSuccess,
    onClose: onCloseSuccess,
  } = useDisclosure();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation({});

  const formik = useFormik({
    initialValues: {
      actualCost: null,
    },
    validationSchema: markTaskAsCompletedSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let response;
      const info = {
        taskId: data?.taskId,
        taskTypeId: data?.taskTypeId,
        taskName: data?.taskName,
        taskDescription: data?.taskDescription ?? undefined,
        priorityId: data?.taskPriorityId,
        taskStatusId: 3,
        assignedTo: data?.assignedTo,
        dueDate: data?.dueDate,
        dateCompleted: data?.dateCompleted,
        costEstimate: data?.costEstimate,
        actualCost: values?.actualCost,
        scheduleId: data?.scheduleId,
        lastModifiedBy: session?.user.id,
      };
      response = await handleSubmit(
        updateTask,
        { id: data?.taskId, ...info },
        'Task Marked as Completed Successfully!'
      );
      if (response?.data) {
        onOpenSuccess();
      }
    },
  });

  const handleCloseSuccessModal = () => {
    onCloseSuccess();
    onClose();
  };

  return (
    <>
      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        contentStyle={{ width: { md: '526px' } }}
      >
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <VStack
              width="full"
              px="32px"
              pt="56px"
              pb="34px"
              spacing="56px"
              alignItems="center"
            >
              <VStack width="full" spacing="8px" alignItems="center">
                <Heading
                  fontWeight={800}
                  fontSize="32px"
                  lineHeight="38.02px"
                  color="primary.500"
                >
                  Mark as completed?
                </Heading>
                <Text color="neutral.700" size="md">
                  You are about to mark this{' '}
                  <Text as="span" fontWeight={800}>
                    {data?.taskId}
                  </Text>{' '}
                  as completed
                </Text>
              </VStack>

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="24px">
                <Text color="neutral.700" size="md">
                  Kindly specify how much is the actual cost of completing this
                  task
                </Text>
                <HStack width="full" alignItems="flex-start" spacing="31px">
                  <Flex width="full" maxW="132px">
                    <SectionInfo
                      title="Actual Cost"
                      info="Add name that users can likely search with"
                      isRequired
                    />
                  </Flex>
                  <Field
                    as={TextInput}
                    name="actualCost"
                    type="number"
                    label="Actual"
                  />
                </HStack>
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
                  isLoading={isUpdating}
                >
                  Continue
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </GenericModal>
      {data && isOpenSuccess && (
        <MarkAsCompletedSuccessModal
          isOpen={isOpenSuccess}
          onClose={handleCloseSuccessModal}
          id={data.taskId}
        />
      )}
    </>
  );
};

export default MarkTaskAsCompletedModal;

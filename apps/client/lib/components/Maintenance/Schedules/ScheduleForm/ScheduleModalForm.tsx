/* eslint-disable no-unused-vars */
import { HStack, VStack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import GenericModal from '~/lib/components/UI/Modal';
import Button from '~/lib/components/UI/Button';
import ModalHeading from '~/lib/components/UI/Modal/ModalHeading';
import BackButton from '~/lib/components/UI/Button/BackButton';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useSession } from 'next-auth/react';
import { scheduleSchema } from '~/lib/schemas/maintenance.schema';
import {
  generateMaintenanceScheduleDTO,
  generateTasksArray,
} from '../../Common/helperFunctions';
import { useCreateMaintenanceScheduleAndTasksMutation } from '~/lib/redux/services/maintenance/schedule.services';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import ScheduleTitle from './FormSection/SectionTwo/Title';
import Type from './FormSection/SectionTwo/Type';
import Description from './FormSection/SectionTwo/Description';
import Frequency from '../../Common/Frequency';
import Date from './FormSection/SectionTwo/Date';
import ServiceLevelAgreement from './FormSection/SectionTwo/SLA';
import Tasks from './FormSection/SectionTwo/Tasks';
import { useAppSelector } from '~/lib/redux/hooks';
import moment from 'moment';

interface ScheduleModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleModalForm = (props: ScheduleModalFormProps) => {
  const { isOpen, onClose } = props;
  const { planId, startDate, endDate } = useAppSelector(
    (state) => state.maintenance.planForm
  );
  const { data: session } = useSession();
  const { handleSubmit } = useCustomMutation();
  const [createScheduleAndTasks, { isLoading }] =
    useCreateMaintenanceScheduleAndTasksMutation();
  const username = session?.user?.username;

  const previousDay = moment(startDate)
    .subtract(1, 'days')
    .format('DD/MM/YYYY');

  const planEndDate = moment(endDate).format('DD/MM/YYYY');

  const formik = useFormik({
    initialValues: {
      name: null,
      planId: planId ?? null,
      typeId: null,
      frequencyId: null,
      assetId: null,
      sla: null,
      description: null,
      comment: null,
      scheduledDate: null,
      completionDate: null,
      tasks: [],
      taskCount: null,
    },
    validationSchema: scheduleSchema(
      true,
      false,
      true,
      previousDay ?? undefined,
      planEndDate ?? undefined
    ),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const PAYLOAD = {
        createMaintenanceScheduleDto: generateMaintenanceScheduleDTO(
          'create',
          values as unknown as ScheduleFormDetails,
          username as string
        ),
        createTaskDtos: generateTasksArray(
          'create',
          values.tasks as unknown as taskFormDetails[],
          username as string
        ),
      };
      handleSubmit(
        createScheduleAndTasks,
        PAYLOAD,
        'Schedule Created Successfully',
        () => {
          resetForm();
          onClose();
        }
      );
    },
  });

  return (
    <>
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
              <BackButton handleClick={onClose} customStyles={{ mb: '40px' }} />
              <ModalHeading heading="Add New Schedule" />

              {/* Main Form Starts Here */}
              <VStack width="full" spacing="27px" mt="40px">
                <ScheduleTitle sectionMaxWidth="118px" spacing="40px" />
                <Type sectionMaxWidth="118px" spacing="40px" />
                <Description sectionMaxWidth="118px" spacing="40px" />
                <Frequency sectionMaxWidth="118px" spacing="40px" />
                <Date
                  sectionMaxWidth="118px"
                  spacing="40px"
                  minScheduleDate={moment(startDate ?? moment()).toDate()}
                  maxScheduleDate={
                    endDate ? moment(endDate).toDate() : undefined
                  }
                  buttonVariant="solid"
                />
                <ServiceLevelAgreement sectionMaxWidth="118px" spacing="40px" />
                <Tasks
                  sectionMaxWidth="118px"
                  spacing="40px"
                  scheduleId={null}
                />
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
                  loadingText="Creating..."
                >
                  Save Schedule
                </Button>
              </HStack>
            </VStack>
          </form>
        </FormikProvider>
      </GenericModal>
    </>
  );
};

export default ScheduleModalForm;

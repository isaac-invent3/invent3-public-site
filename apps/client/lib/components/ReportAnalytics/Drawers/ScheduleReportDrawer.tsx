import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  Button,
  CheckBox,
  FormInputWrapper,
  GenericDrawer,
  TextInput,
} from '@repo/ui/components';
import { Field, FormikProvider, useFormik } from 'formik';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EndDateTime from '~/lib/components/Common/RecurrenceComponents/EndDateTime';
import Frequency from '~/lib/components/Common/RecurrenceComponents/Frequency';
import Intervals from '~/lib/components/Common/RecurrenceComponents/Intervals';
import StartDateTime from '~/lib/components/Common/RecurrenceComponents/StartDateTime';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { RecurrenceInfo } from '~/lib/interfaces/general.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useScheduleReportMutation } from '~/lib/redux/services/reports.services';
import { scheduleReportSchema } from '~/lib/schemas/report.schema';
import ScheduleReportSuccessModal from '../Modals/ScheduleReportSuccessModal';

interface ScheduleReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: number;
}

const ScheduleReportDrawer = (props: ScheduleReportDrawerProps) => {
  const { isOpen, onClose, reportId } = props;

  const recurrence = useAppSelector((state) => state.date.info.recurrence);

  const [scheduleReport, { isLoading: isSchedulingReport }] =
    useScheduleReportMutation({});

  const { handleSubmit } = useCustomMutation();

  const {isOpen:isScheduleSuccessModalOpen,onClose:onScheduleSuccessClose,onOpen:onScheduleSuccessOpen} = useDisclosure()

  const formik = useFormik({
    initialValues: {
      reportId,
      frequencyId: null,
      intervalValue: null,
      dayOccurrences: [],
      weekOccurrences: [],
      monthOccurrences: [],
      yearOccurrences: [],
      recipientIds: [1],
    },

    enableReinitialize: true,
    validationSchema: scheduleReportSchema,
    onSubmit: async (data, { resetForm }) => {
      const session = await getSession();

      const payload = { ...data, createdBy: session?.user.username! };

      const response = await handleSubmit(
        scheduleReport,
        payload,
        ''
      );

      if (response?.data) {
        resetForm();
        onScheduleSuccessOpen();
        // onClose();
      }
    },
  });

  const [maxInterval, setMaxInterval] = useState(1);

  const updateForm = (recurrence: RecurrenceInfo) => {
    formik.setFieldValue('frequencyId', recurrence.frequency?.value);
    formik.setFieldValue('intervalValue', recurrence.interval);
    formik.setFieldValue('dayOccurrences', recurrence.repeatIntervals.daily);
    formik.setFieldValue('weekOccurrences', recurrence.repeatIntervals.weekly);
    formik.setFieldValue(
      'monthOccurrences',
      recurrence.repeatIntervals.monthly
    );
    formik.setFieldValue(
      'yearOccurrences',
      Object.fromEntries(
        Object.entries(recurrence.repeatIntervals.annually).filter(
          // eslint-disable-next-line no-unused-vars
          ([_, value]) => value.length > 0
        )
      )
    );
  };

  useEffect(() => {
    updateForm(recurrence);
  }, [recurrence]);
  return (
    <GenericDrawer isOpen={isOpen} onClose={onClose} maxWidth="507px">
      <DrawerHeader p={0} m={0}>
        <HStack
          pt="16px"
          pb="32px"
          px="24px"
          width="full"
          justifyContent="space-between"
        >
          <BackButton handleClick={onClose} />
        </HStack>
      </DrawerHeader>

      <FormikProvider value={formik}>
        <DrawerBody p={0}>
          <Flex
            direction="column"
            width="full"
            alignItems="flex-start"
            pb="20px"
            px="32px"
          >
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              color="black"
              pb="20px"
              fontWeight={800}
            >
              Schedule Report
            </Heading>
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <VStack width="full" mt="40px" pb="71px" spacing="0px">
                <Frequency setMaxInterval={setMaxInterval} />
                <Intervals maxInterval={maxInterval} />
                <StartDateTime />
                <EndDateTime />
                <FormInputWrapper
                  sectionMaxWidth="130px"
                  mt="32px"
                  spacing="29px"
                  description="Choose the category and the sub-category"
                  title="Send To"
                  isRequired
                >
                  <VStack alignItems="start" spacing="16px">
                    <HStack spacing="8px">
                      <CheckBox
                        isChecked={true}
                        handleChange={() => console.log('hey')}
                      />

                      <Text color="neutral.800">My Email</Text>
                    </HStack>

                    <HStack spacing="8px">
                      <CheckBox
                        isChecked={false}
                        handleChange={() => console.log('hey')}
                      />

                      <Field
                        as={TextInput}
                        name="ticketTitle"
                        type="text"
                        label="Ticket Title"
                        customStyle={{ height: '32px', width: '100%' }}
                      />
                    </HStack>
                  </VStack>
                </FormInputWrapper>
              </VStack>
            </form>
          </Flex>
        </DrawerBody>

        <DrawerFooter p={0} m={0}>
          <HStack
            spacing="8px"
            justifyContent="flex-end"
            mt="8px"
            px="24px"
            pb="32px"
          >
            <Button
              customStyles={{ width: '138px', height: '50px' }}
              variant="secondary"
              handleClick={onClose}
            >
              Cancel
            </Button>

            <Button
              handleClick={() => {
                formik.handleSubmit();
              }}
              isLoading={isSchedulingReport}
              customStyles={{ width: '137px', height: '50px' }}
            >
              Schedule Report
            </Button>
          </HStack>
        </DrawerFooter>
      </FormikProvider>

      <ScheduleReportSuccessModal
        isOpen={isScheduleSuccessModalOpen}
        onClose={onScheduleSuccessClose}
        date=""
      />
    </GenericDrawer>
  );
};

export default ScheduleReportDrawer;

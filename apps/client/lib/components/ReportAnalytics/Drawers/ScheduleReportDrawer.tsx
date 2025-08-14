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
import { getSession, useSession } from 'next-auth/react';
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
import moment from 'moment';

interface ScheduleReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: number;
}

const ScheduleReportDrawer = (props: ScheduleReportDrawerProps) => {
  const { isOpen, onClose, reportId } = props;
  const session = useSession();

  const recurrence = useAppSelector((state) => state.date.info.recurrence);

  const [scheduleReport, { isLoading: isSchedulingReport }] =
    useScheduleReportMutation({});

  const { handleSubmit } = useCustomMutation();
  const today = moment().format('DD/MM/YYYY HH:mm');
  const [selectedStartDate, setSelectedStartDate] = useState(today);

  const {
    isOpen: isScheduleSuccessModalOpen,
    onClose: onScheduleSuccessClose,
    onOpen: onScheduleSuccessOpen,
  } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      reportId,
      frequencyId: null,
      intervalValue: null,
      startDate: null,
      endDate: null,
      dayOccurrences: [],
      weekOccurrences: [],
      monthOccurrences: [],
      yearOccurrences: [],
      recipientIds: [session?.data?.user?.userId!],
    },

    enableReinitialize: true,
    validationSchema: scheduleReportSchema(selectedStartDate),
    onSubmit: async (data, { resetForm }) => {
      const session = await getSession();

      const payload = {
        ...data,
        startDate: moment(data.startDate, 'DD/MM/YYYY HH:mm').utc(),
        endDate: moment(data.endDate, 'DD/MM/YYYY HH:mm').utc(),
        createdBy: session?.user.username!,
      };

      const response = await handleSubmit(scheduleReport, payload, '');

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

  useEffect(() => {
    console.log({ data: formik.values.startDate });
    if (formik.values.startDate) {
      setSelectedStartDate(formik.values.startDate);
    }
  }, [formik.values.startDate]);

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
              size={{ base: 'lg', lg: 'xl' }}
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
                <StartDateTime
                  minStartDate={moment(today, 'DD/MM/YYYY HH:mm').toDate()}
                />
                <EndDateTime
                  minEndDate={moment(
                    selectedStartDate,
                    'DD/MM/YYYY HH:mm'
                  ).toDate()}
                />
                {/* <FormInputWrapper
                  sectionMaxWidth="130px"
                  mt="32px"
                  customSpacing="29px"
                  description="Select and add emails to send the report to"
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
                        name="other"
                        type="text"
                        label="Email"
                        customStyle={{ height: '32px', width: '100%' }}
                      />
                    </HStack>
                  </VStack>
                </FormInputWrapper> */}
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

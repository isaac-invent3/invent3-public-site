import { Heading, Text, VStack } from '@chakra-ui/react';
import { Option } from '@repo/interfaces';
import { Button, GenericSuccessModal } from '@repo/ui/components';
import { summaryText } from '../../Common/HelperFunctions/RecurrenceSummary';
import { useAppSelector } from '~/lib/redux/hooks';

interface ScheduleReportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ScheduleReportSuccessModal = (props: ScheduleReportSuccessModalProps) => {
  const { isOpen, onClose } = props;
  const recurrence = useAppSelector((state) => state.date.info.recurrence);

  const getOccurrence = () => {
    switch (recurrence?.frequency?.label) {
      case 'Daily':
        return recurrence.repeatIntervals.daily;
      case 'Weekly':
        return recurrence.repeatIntervals.weekly;
      case 'Monthly':
      case 'Quarterly':
        return recurrence.repeatIntervals.monthly;
      case 'Annually':
        return recurrence.repeatIntervals.annually;
      default:
        return null;
    }
  };
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          The report has been scheduled!
          <Heading color="#0E2642" fontWeight={800} fontSize="14px">
            {summaryText({
              occurrences: getOccurrence(),
              frequency: recurrence?.frequency?.label,
              startDate: recurrence?.startDate,
              endDate: recurrence.endDate,
              interval: recurrence.interval,
            })}
          </Heading>
        </Text>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default ScheduleReportSuccessModal;

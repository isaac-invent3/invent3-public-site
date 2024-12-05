import { Heading, Text, VStack } from '@chakra-ui/react';
import Button from '~/lib/components/UI/Button';
import GenericSuccessModal from '~/lib/components/UI/Modal/GenericSuccessModal';

interface ScheduleReportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  date:string
}
const ScheduleReportSuccessModal = (props: ScheduleReportSuccessModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          The report has been scheduled for
          <Heading color="#0E2642" fontWeight={800} fontSize="14px">
            Monthly on Day 29
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

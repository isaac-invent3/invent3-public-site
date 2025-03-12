import { Text, VStack } from '@chakra-ui/react';
import { Button, GenericSuccessModal } from '@repo/ui/components';

interface FeedbackFormSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const FeedbackFormSuccess = (props: FeedbackFormSuccessModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Submission Successful !"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <VStack>
          <Text
            color="neutral.700"
            size="md"
            fontWeight={400}
            textAlign="center"
          >
            Thank you for your feedback!
            <br />
            Our team will review it and get back to you if necessary.
          </Text>
        </VStack>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default FeedbackFormSuccess;

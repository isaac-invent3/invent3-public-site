import { Heading, Text, VStack } from '@chakra-ui/react';
import { Button, GenericSuccessModal } from '@repo/ui/components';

interface SaveReportTemplateSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
}
const SaveReportTemplateSuccessModal = (
  props: SaveReportTemplateSuccessModalProps
) => {
  const { isOpen, onClose, templateName } = props;
  return (
    <GenericSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      headingText="Successful!"
      contentStyle={{ spacing: '8px' }}
    >
      <VStack spacing="40px" width="full" mb="48px">
        <Text color="neutral.700" size="md" textAlign="center">
          The template has been saved as
          <Heading color="#0E2642" fontWeight={800} fontSize="14px">
            {templateName}
          </Heading>
        </Text>
        <Button customStyles={{ width: '193px' }} handleClick={onClose}>
          Continue
        </Button>
      </VStack>
    </GenericSuccessModal>
  );
};

export default SaveReportTemplateSuccessModal;

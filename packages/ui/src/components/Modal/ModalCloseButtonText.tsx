import { HStack, Icon, Text } from '@chakra-ui/react';
import { CloseIcon } from '../CustomIcons';

const ModalCloseButtonText = ({ onClose }: { onClose: () => void }) => {
  return (
    <HStack
      spacing="8px"
      as="button"
      justifySelf="end"
      onClick={() => onClose()}
    >
      <Text color="#F50000">Close</Text>
      <Icon as={CloseIcon} color="#F50000" boxSize="12px" />
    </HStack>
  );
};

export default ModalCloseButtonText;

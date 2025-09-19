import { HStack, Icon, Text } from '@chakra-ui/react';
import { CloseIcon } from '../CustomIcons';

const ModalCloseButtonText = ({ onClose }: { onClose: () => void }) => {
  return (
    <HStack
      spacing="8px"
      as="button"
      onClick={() => onClose()}
      width="32px"
      height="32px"
      flexShrink={0}
      rounded="full"
      bgColor="neutral.100"
      justifyContent="center"
      alignItems="center"
    >
      <Icon as={CloseIcon} color="#0E2642" boxSize="16px" />
    </HStack>
  );
};

export default ModalCloseButtonText;

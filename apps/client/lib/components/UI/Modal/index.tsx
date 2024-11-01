import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface IGenericModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentStyle?: { [name: string]: unknown };
  mainModalStyle?: { [name: string]: unknown };
}
function GenericModal({
  isOpen,
  onClose,
  children,
  contentStyle,
  mainModalStyle,
}: IGenericModal) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      isCentered
      scrollBehavior="inside"
      {...mainModalStyle}
    >
      <ModalOverlay />

      <ModalContent
        maxW={{ base: '90vw', sm: 'full' }}
        width="full"
        rounded="8px"
        bgColor="white"
        p={0}
        m={0}
        {...contentStyle}
      >
        {children}
      </ModalContent>
    </Modal>
  );
}

export default GenericModal;

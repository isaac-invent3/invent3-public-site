import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';

interface IGenericModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentStyle?: { [name: string]: unknown };
  customStyle?: { [name: string]: unknown };
}
function GenericModal({
  isOpen,
  onClose,
  children,
  contentStyle,
  customStyle,
}: IGenericModal) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick
      isCentered
      scrollBehavior="inside"
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
        <ModalBody p={0} m={0} width="full" {...customStyle}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GenericModal;

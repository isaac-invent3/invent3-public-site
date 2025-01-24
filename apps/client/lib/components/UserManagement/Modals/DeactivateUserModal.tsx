import {
  Text as ChakraText,
  Heading,
  HStack,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';

interface DeactivateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeactivateUserModal = (props: DeactivateUserModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      contentStyle={{
        width: '526px',
      }}
    >
      <ModalBody p={0} m={0} width="full">
        <VStack
          width="full"
          alignItems="flex-start"
          spacing="40px"
          pt="65px"
          pb="50px"
          px={{ base: '16px', lg: '32px' }}
        >
          <VStack spacing="8px" width="full">
            <Heading
              fontSize="32px"
              lineHeight="38.02px"
              fontWeight={800}
              color="primary.500"
            >
              Deactivate User?
            </Heading>
            <ChakraText
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Are you sure you want to deactivate this user?
            </ChakraText>
          </VStack>
          <HStack width="full" spacing="24px" justifyContent="center">
            <Button
              handleClick={onClose}
              variant="secondary"
              customStyles={{ width: '145px' }}
            >
              Cancel
            </Button>
            <Button
              isLoading={false}
              loadingText="Deactivating..."
              customStyles={{
                bgColor: '#F50000',
                width: '193px',
                _hover: { bgolor: '#F50000' },
                _active: { bgColor: '#F50000' },
              }}
            >
              Deactivate
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default DeactivateUserModal;

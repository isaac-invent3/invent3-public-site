import {
  Heading,
  HStack,
  ModalBody,
  Text as ChakraText,
  VStack,
} from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import GenericModal from '.';

interface GenericDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const GenericDeleteModal = (props: GenericDeleteModalProps) => {
  const { isOpen, onClose, handleDelete, isLoading, children } = props;

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
              Delete?
            </Heading>
            <ChakraText
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Are you sure you want to delete the record? You can’t undo the
              action
            </ChakraText>
          </VStack>
          {children && (
            <VStack
              spacing="8px"
              width="full"
              alignItems="flex-start"
              bgColor="#F5000012"
              p="16px"
              rounded="2px"
              borderLeft="3px solid #F50000"
            >
              <ChakraText color="#A00000" fontWeight={800} size="md">
                Warning
              </ChakraText>
              {children}
            </VStack>
          )}
          <HStack width="full" spacing="24px" justifyContent="center">
            <Button
              handleClick={onClose}
              variant="secondary"
              customStyles={{ width: '145px' }}
            >
              Cancel
            </Button>
            <Button
              handleClick={() => handleDelete()}
              isLoading={isLoading}
              loadingText="Deleting..."
              customStyles={{
                bgColor: '#F50000',
                width: '193px',
                _hover: { bgolor: '#F50000' },
                _active: { bgColor: '#F50000' },
                _focused: { bgColor: '#F50000' },
              }}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default GenericDeleteModal;

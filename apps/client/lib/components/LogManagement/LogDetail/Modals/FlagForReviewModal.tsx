import {
  Text as ChakraText,
  Heading,
  HStack,
  ModalBody,
  VStack,
} from '@chakra-ui/react';
import { Button, GenericModal } from '@repo/ui/components';
import { getSession } from 'next-auth/react';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { useAppSelector } from '~/lib/redux/hooks';
import { useUpdateAuditRecordMutation } from '~/lib/redux/services/log.services';

interface FlagForReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlagForReviewModal = (props: FlagForReviewModalProps) => {
  const { isOpen, onClose } = props;
  const auditRecord = useAppSelector((state) => state.auditLog.auditLog);
  const { handleSubmit } = useCustomMutation();
  const [updateRecord, { isLoading }] = useUpdateAuditRecordMutation({});

  const handleUpdate = async () => {
    const session = await getSession();
    const response = await handleSubmit(
      updateRecord,
      {
        auditRecordId: auditRecord?.auditRecordId!,
        isFlaggedForReview: true,
        lastModifiedBy: session?.user.username!,
      },
      'Record Flagged Successfully'
    );
    if (response?.data) {
      onClose();
    }
  };
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
              size={{ base: 'lg', md: 'xl' }}
              fontWeight={800}
              color="primary.500"
            >
              Flag For Review?
            </Heading>
            <ChakraText
              size="md"
              color="neutral.700"
              maxW="296px"
              textAlign="center"
              fontWeight={400}
            >
              Are you sure you want to flag this log for review?
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
              isLoading={isLoading}
              customStyles={{
                bgColor: '#F50000',
                width: '193px',
                _hover: { bgolor: '#F50000' },
                _active: { bgColor: '#F50000' },
              }}
              handleClick={handleUpdate}
            >
              Flag For Review
            </Button>
          </HStack>
        </VStack>
      </ModalBody>
    </GenericModal>
  );
};

export default FlagForReviewModal;

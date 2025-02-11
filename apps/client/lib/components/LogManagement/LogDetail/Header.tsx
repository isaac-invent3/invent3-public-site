import { HStack, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import FlagForReviewModal from './Modals/FlagForReviewModal';
import { useAppSelector } from '~/lib/redux/hooks';

interface LogHeaderProps {
  handleBack: () => void;
}
const LogHeader = (props: LogHeaderProps) => {
  const { handleBack } = props;
  const auditLog = useAppSelector((state) => state.auditLog.auditLog);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Stack
        width="full"
        justifyContent="space-between"
        direction={{ base: 'column', sm: 'row' }}
        spacing="16px"
      >
        <HStack spacing="16px">
          <Button
            customStyles={{ height: '32px', px: '12px', width: 'max-content' }}
            variant="secondary"
            handleClick={handleBack}
          >
            <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
            Back
          </Button>
        </HStack>

        <HStack
          width={{ base: 'full', sm: 'min-content' }}
          spacing="8px"
          justifyContent="center"
        >
          <Button
            customStyles={{ height: '35px', width: '131px', px: '44px' }}
            variant="primary"
          >
            Export
          </Button>
          {!auditLog?.isFlaggedForReview ? (
            <Button
              customStyles={{ height: '35px', width: '131px', px: '44px' }}
              variant="secondary"
              handleClick={onOpen}
            >
              Flag for Review
            </Button>
          ) : (
            <Text color="red.500"></Text>
          )}
        </HStack>
      </Stack>
      <FlagForReviewModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LogHeader;

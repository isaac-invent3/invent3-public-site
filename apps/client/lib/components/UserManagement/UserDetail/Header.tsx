import { HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import DeactivateUserModal from '../Modals/DeactivateUserModal';

interface UserHeaderProps {
  handleBack: () => void;
}
const UserHeader = (props: UserHeaderProps) => {
  const { handleBack } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack width="full" justifyContent="space-between">
        <HStack spacing="16px">
          <Button
            customStyles={{ height: '32px', px: '12px' }}
            variant="secondary"
            handleClick={handleBack}
          >
            <Icon as={CloseIcon} boxSize="16px" color="primary.500" mr="8px" />
            Back
          </Button>
        </HStack>

        <HStack width="min-content" spacing="8px">
          <Button
            customStyles={{ height: '35px', width: '107px', px: '16px' }}
            variant="primary"
          >
            Modify
          </Button>
          <Button
            customStyles={{
              height: '35px',
              width: '107px',
              px: '8px',
              fontSize: '14px',
              lineHeight: '16.63px',
            }}
            variant="secondary"
            handleClick={onOpen}
          >
            Deactivate
          </Button>
        </HStack>
      </HStack>
      <DeactivateUserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UserHeader;

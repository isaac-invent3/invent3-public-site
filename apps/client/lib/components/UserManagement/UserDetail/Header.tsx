import { HStack, Icon, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { Button } from '@repo/ui/components';
import { CloseIcon } from '../../CustomIcons';
import MobilePopover from './MobilePopover';
import { useAppSelector } from '~/lib/redux/hooks';
import { ROUTES, USER_STATUS_ENUM } from '~/lib/utils/constants';
import ToggleUserStatusModal from '../Modals/ToggleUserStatusModal';

interface UserHeaderProps {
  handleBack: () => void;
  showHeader?: boolean;
}
const UserHeader = (props: UserHeaderProps) => {
  const { handleBack, showHeader } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return;
  }

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

        {showHeader && <MobilePopover data={user} />}
      </HStack>
      <ToggleUserStatusModal isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
};

export default UserHeader;

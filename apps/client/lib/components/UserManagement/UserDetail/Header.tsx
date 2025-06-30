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

        {showHeader &&
          (isMobile ? (
            <MobilePopover data={user} />
          ) : (
            <HStack width="min-content" spacing="8px">
              <Button
                customStyles={{ height: '35px', width: '107px', px: '16px' }}
                variant="primary"
                href={`/${ROUTES.USERS}/${user.userId}/edit`}
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
                {user?.statusId === USER_STATUS_ENUM.ACTIVE
                  ? 'Deactivate'
                  : 'Activate'}
              </Button>
            </HStack>
          ))}
      </HStack>
      <ToggleUserStatusModal isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
};

export default UserHeader;

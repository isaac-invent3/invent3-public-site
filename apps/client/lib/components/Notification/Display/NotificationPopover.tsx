import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { NotifcationTabs } from '../Tabs';
import NotificationHeader from '../NotificationHeader';
import HeaderIcon from '~/lib/layout/ProtectedPage/Header/HeaderIcon';
import { NotificationIcon } from '../../CustomIcons/layout';
import { NotificationTabType } from '~/lib/interfaces/notification.interfaces';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  isLoading: boolean;
  activeTab: NotificationTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<NotificationTabType>>;
  handleMarkNotificationsAsRead: () => void;
}
const NotificationPopover = (props: NotificationPopoverProps) => {
  const {
    isOpen,
    onOpen,
    isLoading,
    onClose,
    activeTab,
    setActiveTab,
    handleMarkNotificationsAsRead,
  } = props;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="9"
          onClick={onClose}
        />
      )}

      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <HeaderIcon
            icon={NotificationIcon}
            size="24px"
            handleClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent
          p={0}
          m={0}
          position="relative"
          zIndex="9"
          width="347.33px"
          height="604px"
          maxH="80vh"
          rounded="10.67px"
          border="none"
          overflow="hidden"
          outline={0}
          _focus={{
            borderColor: 'transparent',
          }}
          _active={{
            borderColor: 'transparent',
          }}
          _focusVisible={{
            borderColor: 'transparent',
          }}
        >
          <PopoverHeader p={0} mt="20px" px="16px" border="none">
            <NotificationHeader
              isLoading={isLoading}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleMarkNotificationsAsRead={handleMarkNotificationsAsRead}
            />
          </PopoverHeader>
          <PopoverBody pt="20px" px="20px" overflowY="auto">
            {isOpen && (
              <NotifcationTabs activeTab={activeTab} handleClose={onClose} />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default NotificationPopover;

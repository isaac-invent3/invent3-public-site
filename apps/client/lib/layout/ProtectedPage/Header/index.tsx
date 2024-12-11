import { HStack } from '@chakra-ui/react';

import HeaderIcon from './HeaderIcon';
import { SearchIcon, SettingsIcon } from '~/lib/components/CustomIcons/layout';
import UserActionPopover from './UserActionPopover';
import NotificationPopover from '~/lib/components/Notification';

const Header = () => {
  return (
    <>
      <HStack spacing="24px" position="absolute" right={0} pr="24px">
        <HeaderIcon icon={SearchIcon} size="20px" />
        <HeaderIcon icon={SettingsIcon} size="24px" />
        <NotificationPopover />
        <UserActionPopover />
      </HStack>
    </>
  );
};

export default Header;

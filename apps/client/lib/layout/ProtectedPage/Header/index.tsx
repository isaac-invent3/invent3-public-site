import { HStack } from '@chakra-ui/react';
import React from 'react';
import HeaderIcon from './HeaderIcon';
import {
  NotificationIcon,
  SearchIcon,
  SettingsIcon,
} from '~/lib/components/CustomIcons/layout';
import UserActionPopover from './UserActionPopover';

const Header = () => {
  return (
    <HStack spacing="24px" position="absolute" right={0} pr="24px">
      <HeaderIcon icon={SearchIcon} size="20px" />
      <HeaderIcon icon={SettingsIcon} size="24px" />
      <HeaderIcon icon={NotificationIcon} size="24px" />
      <UserActionPopover />
    </HStack>
  );
};

export default Header;

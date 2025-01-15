import { HStack } from '@chakra-ui/react';

import HeaderIcon from './HeaderIcon';
import { SearchIcon, SettingsIcon } from '~/lib/components/CustomIcons/layout';
import UserActionPopover from './UserActionPopover';
import NotificationPopover from '~/lib/components/Notification';
import { getBreadcrumb } from './BreadCrumb';
import { usePathname } from 'next/navigation';
import { GenericBreadCrumb } from '@repo/ui/components';

const Header = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadCrumbData = getBreadcrumb(pathSegments);

  return (
    <HStack width="full" justifyContent="space-between" mb="40px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack spacing="24px">
        <HeaderIcon icon={SearchIcon} size="20px" />
        <HeaderIcon icon={SettingsIcon} size="24px" />
        <NotificationPopover />
        <UserActionPopover />
      </HStack>
    </HStack>
  );
};

export default Header;

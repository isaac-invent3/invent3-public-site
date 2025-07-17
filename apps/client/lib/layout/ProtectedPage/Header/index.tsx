import { HStack, Image, Stack, VStack } from '@chakra-ui/react';

import { GenericBreadCrumb } from '@repo/ui/components';
import { usePathname } from 'next/navigation';
// import { SearchIcon, SettingsIcon } from '~/lib/components/CustomIcons/layout';
import NotificationComponents from '~/lib/components/Notification';
import Feedback from './Feedback';
import { getBreadcrumb } from './BreadCrumb';
// import HeaderIcon from './HeaderIcon';
import UserActionPopover from './UserActionPopover';
import AssistantGuideBox from '~/lib/components/CompanyManagement/JourneyGuide/AssistantGuideBox';
import { useSession } from 'next-auth/react';
import { ROLE_IDS_ENUM } from '~/lib/utils/constants';

interface HeaderProps {
  setIsCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = (props: HeaderProps) => {
  const { setIsCollapse } = props;
  const pathname = usePathname();
  const pathSegments = pathname?.split('/').filter(Boolean);
  const breadCrumbData = getBreadcrumb(pathSegments as string[]);
  const { data } = useSession();

  return (
    <VStack width="full" alignItems="flex-start" spacing="0px">
      <Stack
        width="full"
        justifyContent="space-between"
        mb={{ base: '32px', lg: '40px' }}
        spacing="16px"
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        px={{ base: '16px', md: 0 }}
        flexWrap="wrap"
      >
        <GenericBreadCrumb routes={breadCrumbData} />
        <HStack
          width={{ base: 'full', md: 'max-content' }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <HStack
            width="40px"
            height="40px"
            rounded="8px"
            bgColor="primary.500"
            justifySelf="center"
            alignSelf="center"
            cursor="pointer"
            onClick={() => setIsCollapse(false)}
            display={{ md: 'none' }}
            pl="16px" //Temporary fix of alignment
            pt="8px" //Temporary fix of alignment
            flexShrink={0}
          >
            <Image
              src="/logo-small-initials-white.svg"
              alt="Invent3 logo"
              height="24px"
              width="8px"
            />
          </HStack>
          <HStack spacing={{ base: '8px', md: '24px' }}>
            <HStack display={{ base: 'none', lg: 'flex' }}>
              {data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) && (
                <AssistantGuideBox />
              )}
            </HStack>
            {!data?.user?.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) && (
              <Feedback />
            )}
            {/* <HeaderIcon icon={SearchIcon} size="20px" />
          <HeaderIcon icon={SettingsIcon} size="24px" /> */}
            <NotificationComponents />
            <UserActionPopover />
          </HStack>
        </HStack>
      </Stack>
      {data?.user?.roleIds.includes(ROLE_IDS_ENUM.CLIENT_ADMIN) && (
        <HStack
          display={{ base: 'flex', lg: 'none' }}
          mb="16px"
          px={{ base: '16px', md: 0 }}
        >
          <AssistantGuideBox containerStyle={{ width: '100%' }} />
        </HStack>
      )}
    </VStack>
  );
};

export default Header;

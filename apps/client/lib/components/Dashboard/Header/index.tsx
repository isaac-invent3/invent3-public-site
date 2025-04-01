import { HStack, Text, VStack } from '@chakra-ui/react';

import { useSession } from 'next-auth/react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PageHeader from '../../UI/PageHeader';
import { useSearchParams } from 'next/navigation';
import { DashboardView } from '~/lib/interfaces/dashboard.interfaces';

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 18) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

interface HeaderProps {
  children?: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {
  const { data } = useSession();
  const now = new Date();
  const searchParams = useSearchParams();
  const view = searchParams?.get('view');

  const LABEL_MAP: Record<DashboardView, string> = {
    super_admin: 'Super Admin',
    third_party: 'Third Party',
    client_admin: 'Client Admin',
    executive: 'Executive',
    operation_manager: 'Operation Manager',
    field_engineer: 'Field Engineer',
    front_desk: 'Front Desk',
  };

  return (
    <VStack alignItems="flex-end" spacing="24px">
      <HStack
        width="full"
        justifyContent="space-between"
        spacing="16px"
        flexWrap="wrap"
        px={{ base: '16px', md: 0 }}
      >
        <HStack spacing="8px" alignItems="flex-end" flexWrap="wrap">
          <PageHeader>
            {`${getGreeting()}, ${data?.user?.firstName ?? ''}!`}
          </PageHeader>
          <Text
            color="neutral.600"
            fontWeight={700}
          >{`It's ${dateFormatter(now, 'dddd D, MMMM YYYY')}`}</Text>
        </HStack>

        {data?.user &&
          data?.user?.roleIds.length > 1 &&
          view &&
          LABEL_MAP[view as DashboardView] && (
            <Text p="8px" rounded="8px" bgColor="#2988E626" color="primary.500">
              {LABEL_MAP[view as DashboardView]}'s Dashboard
            </Text>
          )}
      </HStack>
      {children}
    </VStack>
  );
};

export default Header;

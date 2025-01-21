import { HStack, Text } from '@chakra-ui/react';

import { useSession } from 'next-auth/react';
import { dateFormatter } from '~/lib/utils/Formatters';
import PageHeader from '../../UI/PageHeader';

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
  return (
    <HStack width="full" justifyContent="space-between">
      <HStack width="full" spacing="8px" alignItems="flex-end">
        <PageHeader>
          {`${getGreeting()}, ${data?.user?.firstName ?? ''}!`}
        </PageHeader>
        <Text
          color="neutral.600"
          fontWeight={700}
        >{`It's ${dateFormatter(now, 'dddd D, MMMM YYYY')}`}</Text>
      </HStack>
      {children}
    </HStack>
  );
};

export default Header;

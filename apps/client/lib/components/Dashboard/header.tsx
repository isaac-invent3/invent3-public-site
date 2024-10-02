import { HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PageHeader from '../UI/PageHeader';
import { useSession } from 'next-auth/react';
import { dateFormatter } from '~/lib/utils/Formatters';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Overview',
    route: '#',
  },
];

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

const Header = () => {
  const { data } = useSession();
  const now = new Date();
  return (
    <VStack spacing="45px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" spacing="8px" alignItems="flex-end">
        <PageHeader>
          {`${getGreeting()}, ${data?.user?.name?.split(' ')?.[0]?.toString() ?? ''}!`}
        </PageHeader>
        <Text
          color="neutral.600"
          fontWeight={700}
        >{`It's ${dateFormatter(now, 'dddd D, MMMM YYYY')}`}</Text>
      </HStack>
    </VStack>
  );
};

export default Header;

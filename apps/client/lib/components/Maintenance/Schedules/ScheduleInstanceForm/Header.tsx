import { HStack, VStack } from '@chakra-ui/react';

import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '~/lib/components/UI/PageHeader';

const Header = () => {
  const breadCrumbData = [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Maintenance Schedule',
      route: '/maintenance?tab=Schedules',
    },
    {
      label: 'Edit Maintenance Schedule',
      route: '#',
    },
  ];
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <PageHeader>Edit Maintenance Schedule Instance</PageHeader>
      </HStack>
    </VStack>
  );
};

export default Header;

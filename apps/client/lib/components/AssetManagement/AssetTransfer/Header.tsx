import { HStack, VStack } from '@chakra-ui/react';

import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '../../UI/PageHeader';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Asset Management',
    route: '/asset-management',
  },
  {
    label: 'Asset Transfer',
    route: '#',
  },
];
const Header = () => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Asset Transfer Request</PageHeader>
      </HStack>
    </VStack>
  );
};

export default Header;

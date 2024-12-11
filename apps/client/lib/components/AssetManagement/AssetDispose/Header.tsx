import { HStack, VStack } from '@chakra-ui/react';

import GenericBreadCrumb from '../../UI/BreadCrumb';
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
    label: 'Dispose Asset Request',
    route: '#',
  },
];
const Header = () => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Dispose Asset Request</PageHeader>
      </HStack>
    </VStack>
  );
};

export default Header;

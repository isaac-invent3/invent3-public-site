import { VStack } from '@chakra-ui/react';
import { GenericBreadCrumb } from '@repo/ui/components';
import PageHeader from '../UI/PageHeader';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Settings',
    route: '#',
  },
];

const Header = () => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <PageHeader>Settings</PageHeader>
    </VStack>
  );
};

export default Header;

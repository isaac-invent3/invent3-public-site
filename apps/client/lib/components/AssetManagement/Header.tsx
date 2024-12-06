import { HStack, Icon, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericBreadCrumb from '../UI/BreadCrumb';
import PageHeader from '../UI/PageHeader';
import { Button } from '@repo/ui/components';
import { AddIcon } from '../CustomIcons';

const breadCrumbData = [
  {
    label: 'Dashboard',
    route: '/',
  },
  {
    label: 'Asset Management',
    route: '#',
  },
];
const Header = () => {
  return (
    <VStack spacing="58px" alignItems="flex-start" width="full" pt="12px">
      <GenericBreadCrumb routes={breadCrumbData} />
      <HStack width="full" justifyContent="space-between">
        <PageHeader>Asset Management</PageHeader>
        <Button href="/asset-management/add" customStyles={{ width: '227px' }}>
          <Icon as={AddIcon} boxSize="18px" color="#D2FEFD" mr="4px" />
          Add Asset
        </Button>
      </HStack>
    </VStack>
  );
};

export default Header;

import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import GenericBreadCrumb from '~/lib/components/UI/BreadCrumb';
import PageHeader from '~/lib/components/UI/PageHeader';

interface HeaderProps {
  type: 'create' | 'edit';
}
const Header = (props: HeaderProps) => {
  const { type } = props;
  const defaultHeader =
    type === 'create'
      ? 'Add New Maintenance Schedule'
      : 'Edit Maintenance Schedule';

  const breadCrumbData = [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Maintenance Schedule',
      route: '/maintenance',
    },
    {
      label: defaultHeader,
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
        <PageHeader>{defaultHeader}</PageHeader>
      </HStack>
    </VStack>
  );
};

export default Header;

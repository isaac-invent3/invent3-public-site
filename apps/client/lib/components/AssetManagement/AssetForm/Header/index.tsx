import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';
import GenericBreadCrumb from '~/lib/components/UI/BreadCrumb';
import PageHeader from '~/lib/components/UI/PageHeader';
import ParentAsset from './ParentAsset';

interface HeaderProps {
  type: 'create' | 'edit';
}
const Header = (props: HeaderProps) => {
  const { type } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const defaultHeader = type === 'create' ? 'Add New Asset' : 'Edit Asset';

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
      label: assetData?.assetId ? 'Add Child Asset' : defaultHeader,
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
        <PageHeader>
          {type === 'create' ? 'Add New Asset' : 'Edit Asset'}
        </PageHeader>
        {assetData?.assetId && <ParentAsset />}
      </HStack>
    </VStack>
  );
};

export default Header;

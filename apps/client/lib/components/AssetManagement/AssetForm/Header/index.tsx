import { HStack } from '@chakra-ui/react';

import { useAppSelector } from '~/lib/redux/hooks';
import PageHeader from '~/lib/components/UI/PageHeader';
import ParentAsset from './ParentAsset';

interface HeaderProps {
  type: 'create' | 'edit';
}
const Header = (props: HeaderProps) => {
  const { type } = props;
  const assetData = useAppSelector((state) => state.asset.asset);

  return (
    <HStack width="full" justifyContent="space-between" alignItems="flex-start">
      <PageHeader>
        {type === 'create' ? 'Add New Asset' : 'Edit Asset'}
      </PageHeader>
      {assetData?.assetId && <ParentAsset />}
    </HStack>
  );
};

export default Header;

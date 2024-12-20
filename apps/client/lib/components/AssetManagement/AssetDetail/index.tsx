import { DrawerBody, DrawerHeader, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Asset } from '~/lib/interfaces/asset/general.interface';
import AssetHeader from './Header';
import AssetInfo from './AssetInfo';
import AssetTabs from './AssetTabs';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearAsset, setAsset } from '~/lib/redux/slices/AssetSlice';
import { GenericDrawer } from '@repo/ui/components';

interface AssetDetailProps {
  data: Asset | null;
  isOpen: boolean;
  onClose: () => void;
  type?: 'template' | 'main';
}
const AssetDetail = (props: AssetDetailProps) => {
  const { data, isOpen, onClose, type = 'main' } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setAsset(data));
    }

    return () => {
      dispatch(clearAsset());
    };
  }, [data]);

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="850px"
      customStyle={{ trapFocus: true }}
    >
      <DrawerHeader px="32px" pt="16px" pb="29px">
        <AssetHeader handleBack={onClose} type={type} />
      </DrawerHeader>
      <DrawerBody p={0}>
        <VStack width="full" alignItems="flex-start" spacing="24px">
          <AssetInfo />
          <AssetTabs />
        </VStack>
      </DrawerBody>
    </GenericDrawer>
  );
};

export default AssetDetail;

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import AssetHeader from './Header';
import AssetInfo from './AssetInfo';
import AssetTabs from './AssetTabs';
import { useAppDispatch } from '~/lib/redux/hooks';
import { clearAsset, setAsset } from '~/lib/redux/slices/assetSlice';

interface AssetDetailProps {
  data: Asset;
  isOpen: boolean;
  onClose: () => void;
}
const AssetDetail = (props: AssetDetailProps) => {
  const { data, isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAsset(data));

    return () => {
      dispatch(clearAsset());
    };
  }, [data]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      closeOnOverlayClick
      size="xl"
    >
      <DrawerOverlay
        height={`${innerHeight}px !important`}
        bgColor="#00000040"
      />
      <DrawerContent p={0} m={0}>
        <DrawerHeader px="32px" pt="16px" pb="29px">
          <AssetHeader handleBack={onClose} />
        </DrawerHeader>
        <DrawerBody p={0}>
          <VStack width="full" alignItems="flex-start" spacing="24px">
            <AssetInfo />
            <AssetTabs />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AssetDetail;

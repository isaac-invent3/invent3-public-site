import { Flex, Stack } from '@chakra-ui/react';

import AssetDetails from '../../Common/AssetDetailWrapper';
import OtherDisposalInfo from './OtherDisposalInfo';
import { useAppSelector } from '~/lib/redux/hooks';
import MobileAssetInfo from './MobileInfo';

const SectionOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  return (
    <Stack
      width="full"
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '16px', lg: '24px' }}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <AssetDetails showStatus showMaintenanceHistoryButton>
        <Flex
          display={{ base: 'flex', lg: 'none' }}
          width="full"
          flexWrap="wrap"
        >
          <MobileAssetInfo />
        </Flex>
        <Flex display={{ base: 'none', lg: 'flex' }}>
          <OtherDisposalInfo />
        </Flex>
      </AssetDetails>
      <Flex display={{ base: 'flex', lg: 'none' }} width="full">
        <OtherDisposalInfo />
      </Flex>
    </Stack>
  );
};

export default SectionOne;

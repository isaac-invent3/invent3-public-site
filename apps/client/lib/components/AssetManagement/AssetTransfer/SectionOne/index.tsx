import { Flex, HStack, Stack } from '@chakra-ui/react';

import CurrentOwner from './CurrentOwner';
import AssetDetailWrapper from '../../Common/AssetDetailWrapper';
import { useAppSelector } from '~/lib/redux/hooks';
import DetailSection from '../../AssetDetail/DetailSection';
import LocationConditionInfo from './LocationConditionInfo';

const SectionOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const { assetId, assetCategory, brandName, modelRef } = assetData;

  const info1 = [
    {
      label: 'Asset ID:',
      value: assetId ?? 'N/A',
    },
    {
      label: 'Category:',
      value: assetCategory ?? 'N/A',
    },
  ];

  const info2 = [
    {
      label: 'Make:',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model:',
      value: modelRef ?? 'N/A',
    },
  ];
  return (
    <Flex
      gap={{ base: '32px', lg: '44px' }}
      width="full"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex width={{ base: 'full', lg: '40%' }} pt="14px">
        <CurrentOwner />
      </Flex>
      <Flex
        width={{ base: 'full', lg: '60%' }}
        direction={{ base: 'column', lg: 'row' }}
        gap="16px"
      >
        <AssetDetailWrapper showStatus={false}>
          <HStack
            width="full"
            columnGap="56px"
            rowGap="8px"
            alignItems="flex-start"
            flexWrap={{ base: 'wrap', '2xl': 'nowrap' }}
          >
            <Stack direction="column" rowGap="8px">
              <DetailSection
                details={info1}
                labelMinWidth="65px"
                labelStyle={{ fontWeight: 800 }}
                valueStyle={{ fontWeight: 800 }}
              />
              <DetailSection details={info2} labelMinWidth="65px" />
            </Stack>
            <LocationConditionInfo />
          </HStack>
        </AssetDetailWrapper>
      </Flex>
    </Flex>
  );
};

export default SectionOne;

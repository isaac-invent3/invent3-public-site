import { VStack } from '@chakra-ui/react';
import DetailSection from '../../AssetDetail/DetailSection';
import { useAppSelector } from '~/lib/redux/hooks';

const MobileAssetInfo = () => {
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
    <VStack
      width="full"
      columnGap="48px"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      <DetailSection
        details={info1}
        labelMinWidth="65px"
        wrapperStyle={{ width: 'full' }}
        valueStyle={{
          fontWeight: 800,
          whiteSpace: 'wrap',
        }}
        itemContainerStyle={{
          spacing: '16px',
        }}
      />
      <DetailSection
        details={info2}
        labelMinWidth="65px"
        wrapperStyle={{ width: 'full' }}
        itemContainerStyle={{ spacing: '16px' }}
      />
    </VStack>
  );
};

export default MobileAssetInfo;

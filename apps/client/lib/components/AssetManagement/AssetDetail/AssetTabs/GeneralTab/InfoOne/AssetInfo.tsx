import { VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

const AssetDimension = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { brandName, modelRef, serialNo, description } = assetData;
  const details = [
    {
      label: 'Make:',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model:',
      value: modelRef ?? 'N/A',
    },
    {
      label: 'Serial Number:',
      value: serialNo ?? 'N/A',
    },
  ];
  return (
    <VStack alignItems="flex-start" spacing={6} width="full" py="10px" px={4}>
      <VStack alignItems="flex-start" spacing="9px" width="full">
        {details.map((item, index) => (
          <Detail {...item} key={index} labelMinWidth="102px" />
        ))}
      </VStack>
      <Detail
        label="Description:"
        value={description}
        itemContainerStyle={{ direction: 'column' }}
        valueStyle={{ color: 'neutral.800' }}
      />
    </VStack>
  );
};

export default AssetDimension;

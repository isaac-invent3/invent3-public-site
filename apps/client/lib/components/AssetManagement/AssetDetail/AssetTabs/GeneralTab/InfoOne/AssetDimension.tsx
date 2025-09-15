import { VStack } from '@chakra-ui/react';
import { useAppSelector } from '~/lib/redux/hooks';
import Detail from '~/lib/components/UI/ContentDetails/Detail';

const AssetDimension = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

  const { weightKg, lengthCm, widthCm, heightCm } = assetData;
  const details = [
    {
      label: 'Weight:',
      value: weightKg !== null ? `${weightKg}kg` : 'N/A',
    },
    {
      label: 'Length:',
      value: lengthCm !== null ? `${lengthCm}cm` : 'N/A',
    },
    {
      label: 'Width:',
      value: widthCm !== null ? `${widthCm}cm` : 'N/A',
    },
    {
      label: 'Height:',
      value: heightCm !== null ? `${heightCm}cm` : 'N/A',
    },
  ];
  return (
    <VStack alignItems="flex-start" spacing="8px" width="full">
      {details.map((item, index) => (
        <Detail {...item} key={index} labelMinWidth="50px" />
      ))}
    </VStack>
  );
};

export default AssetDimension;

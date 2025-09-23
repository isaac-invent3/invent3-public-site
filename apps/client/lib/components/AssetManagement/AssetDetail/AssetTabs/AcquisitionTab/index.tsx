import { VStack } from '@chakra-ui/react';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAcquisitionInfoByAssetIdQuery } from '~/lib/redux/services/asset/general.services';
import VendorTexts from './InfoOne/VendorDetails';

const AcquisitionTab = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;

  const { data, isLoading } = useGetAcquisitionInfoByAssetIdQuery(
    { id: assetId },
    { skip: !assetId }
  );

  return (
    <VStack
      width="full"
      spacing={{ base: '0px', md: '24px' }}
      my="24px"
      bgColor="white"
      p={{ base: '16px' }}
      rounded="8px"
    >
      <InfoOne isLoading={isLoading} data={data?.data} />
      <VendorTexts data={data?.data} />
    </VStack>
  );
};

export default AcquisitionTab;

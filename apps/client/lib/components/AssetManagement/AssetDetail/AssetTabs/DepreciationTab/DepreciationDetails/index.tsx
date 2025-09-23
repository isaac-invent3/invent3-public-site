import { VStack } from '@chakra-ui/react';
import React from 'react';
import Depreciation from './Depreciation';
import DepreciationHistory from './DepreciationHistory';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetSingleAssetDepreciationInfoByAssetIdQuery } from '~/lib/redux/services/asset/depreciation.services';

const DepreciationDetails = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;
  const { data, isLoading } = useGetSingleAssetDepreciationInfoByAssetIdQuery({
    assetId,
  });

  return (
    <VStack width={{ base: 'full', lg: '60%' }} spacing="40px">
      <Depreciation data={data?.data} isLoading={isLoading} />
      <DepreciationHistory depreciationId={data?.data?.depreciationId} />
    </VStack>
  );
};

export default DepreciationDetails;

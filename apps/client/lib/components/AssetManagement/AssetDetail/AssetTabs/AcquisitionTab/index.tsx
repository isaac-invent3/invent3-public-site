import { VStack } from '@chakra-ui/react';
import React from 'react';
import InfoOne from './InfoOne';
import InfoTwo from './InfoTwo';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetAcquisitionInfoByAssetIdQuery } from '~/lib/redux/services/asset/general.services';

const AcquisitionTab = () => {
  const { assetId } = useAppSelector((state) => state.asset.asset);
  const { data, isLoading } = useGetAcquisitionInfoByAssetIdQuery(
    { id: assetId },
    { skip: !assetId }
  );

  return (
    <VStack width="full" spacing="40px" my="24px">
      <InfoOne isLoading={isLoading} data={data?.data} />
      <InfoTwo isLoading={isLoading} data={data?.data} />
    </VStack>
  );
};

export default AcquisitionTab;

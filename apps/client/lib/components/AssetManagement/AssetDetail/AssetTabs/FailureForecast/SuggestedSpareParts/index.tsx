import { Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';
import { AssetForecast } from '~/lib/interfaces/forecast.interfaces';
import SuggestedSpartPartsTable from './SuggestedSpartPartsTable';

interface SuggestedSparePartsProps {
  isLoading: boolean;
  data?: AssetForecast;
}

const SuggestedSpareParts = (props: SuggestedSparePartsProps) => {
  const { data, isLoading } = props;

  return (
    <VStack width="full" spacing="0px" alignItems="flex-start">
      {isLoading && <Skeleton width="full" height="100px" />}
      <SuggestedSpartPartsTable />
    </VStack>
  );
};

export default SuggestedSpareParts;

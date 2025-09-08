import React from 'react';
import SummaryCardWrapper from '../../../Common/SummaryCardWrapper';
import { AssetBoxIcon } from '~/lib/components/CustomIcons/Dashboard';
import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import ProgressIndicator from '../ProgressIndicator';

interface TotalAssetSummaryProps {
  isLoading: boolean;
  assetInUse: number | undefined;
  assetNotInUse: number | undefined;
  percentChange: number | undefined;
}

const TotalAssetSummary = (props: TotalAssetSummaryProps) => {
  const { isLoading, assetInUse, assetNotInUse, percentChange } = props;

  return (
    <SummaryCardWrapper
      title="Assets in Use"
      icon={AssetBoxIcon}
      containerStyle={{ minH: '164px' }}
      additionalContent={
        <Skeleton isLoaded={!isLoading}>
          <ProgressIndicator valueChange={percentChange ?? 0} />
        </Skeleton>
      }
      isLoading={isLoading}
      count={assetInUse}
    >
      <HStack spacing="4px">
        <Skeleton isLoaded={!isLoading}>
          <Text
            color="#0366EF"
            py="4px"
            px="12px"
            rounded="full"
            bgColor="#0366EF1A"
            fontWeight={700}
          >
            {assetNotInUse?.toLocaleString() ?? '-'}
          </Text>
        </Skeleton>
        <Text color="neutral.600" fontWeight={700}>
          Assets{' '}
          <Text as="span" color="black" fontWeight={800}>
            NOT
          </Text>{' '}
          is Use
        </Text>
      </HStack>
    </SummaryCardWrapper>
  );
};

export default TotalAssetSummary;

import React from 'react';
import SummaryCardWrapper from '../SummaryCardWrapper';
import { AssetBoxIcon } from '~/lib/components/CustomIcons/Dashboard';
import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import ProgressIndicator from '../ProgressIndicator';

interface TotalAssetSummaryProps {
  isLoading: boolean;
}

const TotalAssetSummary = (props: TotalAssetSummaryProps) => {
  const { isLoading } = props;

  const ticketValue = 500;
  return (
    <SummaryCardWrapper
      title="Assets in Use"
      icon={AssetBoxIcon}
      containerStyle={{ minH: '164px' }}
    >
      <VStack
        justifyContent="space-between"
        alignItems="flex-start"
        height="full"
      >
        <VStack alignItems="flex-start" spacing="8px">
          <HStack spacing="4px">
            <Text
              mt="8px"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
              color="primary.500"
            >
              {ticketValue !== undefined ? ticketValue.toLocaleString() : '-'}
            </Text>
            <ProgressIndicator valueChange={-10} />
          </HStack>
          <Text color="neutral.600" fontWeight={700}>
            This month
          </Text>
        </VStack>
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
              {90}
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
      </VStack>
    </SummaryCardWrapper>
  );
};

export default TotalAssetSummary;

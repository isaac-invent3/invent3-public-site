import React from 'react';
import SummaryCardWrapper from '../../../../Common/SummaryCardWrapper';
import { HStack, Skeleton, StackDivider, Text, VStack } from '@chakra-ui/react';
import ProgressIndicator from '../../../Common/ProgressIndicator';

const AssetSummary = () => {
  const totalAsset = 900;
  const detailHeader = ['Asset Transfered', 'Asset Disposed', 'Asset Deleted'];

  const details = [
    {
      value: 300,
      valueChange: -10,
    },
    {
      value: 290,
      valueChange: -10,
    },
    {
      value: 200,
      valueChange: -10,
    },
  ];
  return (
    <SummaryCardWrapper title="Total Assets" containerStyle={{ width: 'full' }}>
      <VStack width="full" alignItems="flex-start" spacing="24px">
        <HStack alignItems="flex-end" spacing="4px">
          <Skeleton isLoaded={true}>
            <Text
              mt="8px"
              fontSize="24px"
              lineHeight="28.51px"
              fontWeight={800}
              color="primary.500"
            >
              {totalAsset !== undefined ? totalAsset.toLocaleString() : '-'}
            </Text>
          </Skeleton>
          <Text color="neutral.600" fontWeight={700} mb="4px">
            This month
          </Text>
        </HStack>
        <VStack width="full" spacing="16px">
          <HStack width="full" justifyContent="space-around" spacing="16px">
            {detailHeader.map((item, index) => (
              <Text key={index} color="neutral.800">
                {item}
              </Text>
            ))}
          </HStack>
          <HStack
            width="full"
            justifyContent="space-around"
            divider={<StackDivider borderColor="#BBBBBB" />}
            spacing="14px"
          >
            {details.map((item, index) => (
              <VStack spacing="8px" key={index} alignItems="flex-start">
                <HStack spacing="16px">
                  <Text color="neutral.800" fontWeight={800} size="lg">
                    {item.value}
                  </Text>
                  <ProgressIndicator valueChange={item.valueChange} />
                </HStack>
                <Text color="neutral.600" fontWeight={700} mb="4px">
                  This month
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </SummaryCardWrapper>
  );
};

export default AssetSummary;

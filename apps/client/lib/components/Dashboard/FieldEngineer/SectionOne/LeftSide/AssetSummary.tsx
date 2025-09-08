import React from 'react';
import SummaryCardWrapper from '../../../../Common/SummaryCardWrapper';
import { HStack, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import ProgressIndicator from '../../../Common/ProgressIndicator';
import { useGetFieldEngineerAssetStatusDataQuery } from '~/lib/redux/services/dashboard/fieldengineer.services';
import { useSession } from 'next-auth/react';

const AssetSummary = () => {
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading } = useGetFieldEngineerAssetStatusDataQuery({
    userId: user?.userId!,
  });
  const totalAsset = data?.data?.totalAssets;

  const details = [
    {
      header: 'Asset Transfered',
      value: data?.data?.transferredAssets,
      valueChange: data?.data.assetTransferedPercentageRange ?? 0,
    },
    {
      header: 'Asset Disposed',
      value: data?.data?.disposedAssets,
      valueChange: data?.data.assetDisposed ?? 0,
    },
    {
      header: 'Asset Deleted',
      value: data?.data?.decommissionedAssets,
      valueChange: data?.data.assetDeleted ?? 0,
    },
  ];
  return (
    <SummaryCardWrapper
      title="Total Assets"
      containerStyle={{ width: 'full', overflow: 'hidden' }}
      count={totalAsset}
      additionalContent={
        <Text color="neutral.600" fontWeight={700} mb="4px">
          This month
        </Text>
      }
    >
      <Stack
        width="full"
        direction={{ base: 'row' }}
        justifyContent="space-around"
        divider={<StackDivider borderColor="#BBBBBB" />}
        spacing="14px"
        overflow="scroll"
      >
        {details.map((item, index) => (
          <VStack key={index} spacing="16px">
            <Text color="neutral.800" whiteSpace="nowrap">
              {item.header}
            </Text>
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
          </VStack>
        ))}
      </Stack>
    </SummaryCardWrapper>
  );
};

export default AssetSummary;

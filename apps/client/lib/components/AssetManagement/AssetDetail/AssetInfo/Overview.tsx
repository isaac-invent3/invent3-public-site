import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Asset } from '~/lib/interfaces/asset.interfaces';
import AssetStatus from '../../AssetStatus';

interface OverviewProps {
  data: Asset;
}
const Overview = ({ data }: OverviewProps) => {
  const assetInfo = [
    {
      label: 'Make',
      value: 'Dell',
    },
    {
      label: 'Model',
      value: 'Latitude 360',
    },
    {
      label: 'Serial Number',
      value: data?.serialNo ?? '-',
    },
  ];
  return (
    <HStack
      width="full"
      py="24px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="16px"
      alignItems="flex-start"
    >
      <Flex height="149px" width="184px" rounded="16px" bgColor="white" />
      <VStack alignItems="flex-start" width="full" spacing="24px">
        <HStack spacing="16px">
          <Heading
            as="h3"
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
          >
            {data.assetName}
          </Heading>
          <AssetStatus color="#07CC3B" label={data?.currentStatus} />
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px">
              <Text size="md" color="neutral.600" fontWeight={800} width="92px">
                Asset ID
              </Text>
              <Text size="md" color="black" fontWeight={800}>
                {data.assetId}
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Text color="neutral.600" size="md" fontWeight={800} width="92px">
                Category
              </Text>
              <Text size="md" color="black" fontWeight={800}>
                {data.assetCategory}
              </Text>
            </HStack>
            {assetInfo.map((info) => (
              <HStack spacing="8px">
                <Text color="neutral.600" width="92px" size="md">
                  {info.label}
                </Text>
                <Text>{info.value}</Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="7px">
            <Text size="md" color="black">
              Barcode:
            </Text>
            <Flex bgColor="white" height="89px" width="185px" />
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;

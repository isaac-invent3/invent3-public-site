import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AssetStatus from '../../AssetStatus';
import { ReactBarcode, Renderer } from 'react-jsbarcode';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    serialNo,
    currentStatus,
    assetName,
    assetId,
    assetCategory,
    brandName,
    modelRef,
  } = assetData;

  const assetInfo = [
    {
      label: 'Make',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model',
      value: modelRef ?? 'N/A',
    },
    {
      label: 'Serial Number',
      value: serialNo ?? 'N/A',
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
            {assetName}
          </Heading>
          <AssetStatus status={currentStatus} />
        </HStack>
        <HStack width="full" justifyContent="space-between">
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px">
              <Text size="md" color="neutral.600" fontWeight={800} width="92px">
                Asset ID
              </Text>
              <Text size="md" color="black" fontWeight={800}>
                {assetId}
              </Text>
            </HStack>
            <HStack spacing="8px">
              <Text color="neutral.600" size="md" fontWeight={800} width="92px">
                Category
              </Text>
              <Text size="md" color="black" fontWeight={800}>
                {assetCategory}
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
            <Flex bgColor="white" height="89px" width="185px">
              <ReactBarcode
                value={assetId ? assetId.toString() : ''}
                renderer={Renderer.CANVAS}
                options={{ displayValue: false }}
                style={{ width: '100%' }}
              />
            </Flex>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;

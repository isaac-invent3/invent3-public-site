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
    primaryImage,
    primaryImagePrefix,
  } = assetData;

  const assetInfo1 = [
    {
      label: 'Make:',
      value: brandName ?? 'N/A',
    },
  ];

  const assetInfo2 = [
    {
      label: 'Model:',
      value: modelRef ?? 'N/A',
    },
    {
      label: 'Serial Number:',
      value: serialNo ?? 'N/A',
    },
  ];

  return (
    <HStack
      width="full"
      py="24px"
      px="32px"
      bgColor="#B4BFCA4D"
      spacing="24px"
      alignItems="flex-start"
    >
      <Flex
        height="175px"
        width="216px"
        rounded="16px"
        bgColor="white"
        overflow="hidden"
        flexShrink={0}
      >
        <Flex
          width="full"
          height="full"
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
          mx="8px"
          bgImage={`${primaryImagePrefix}${primaryImage}`}
        />
      </Flex>
      <VStack alignItems="flex-start" width="full" spacing="16px">
        <HStack spacing="16px">
          <Heading
            as="h3"
            fontSize="32px"
            lineHeight="38.02px"
            fontWeight={800}
          >
            {assetName}
          </Heading>
        </HStack>
        <HStack width="full" spacing="42px" alignItems="flex-start">
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px" alignItems="center">
              <Text color="neutral.600" width="65px" size="md">
                Status:
              </Text>
              <AssetStatus status={currentStatus} />
            </HStack>
            <HStack spacing="8px" alignItems="center">
              <Text size="md" color="neutral.600" width="65px">
                Asset ID:
              </Text>
              <Text size="md" color="black">
                {assetId}
              </Text>
            </HStack>
            <HStack spacing="8px" alignItems="center">
              <Text
                color="neutral.600"
                size="md"
                width="65px"
                whiteSpace="nowrap"
              >
                Category:
              </Text>
              <Text size="md" color="black">
                {assetCategory}
              </Text>
            </HStack>
            {assetInfo1.map((info) => (
              <HStack spacing="8px" alignItems="center">
                <Text color="neutral.600" width="65px" size="md">
                  {info.label}
                </Text>
                <Text color="black" size="md">
                  {info.value}
                </Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            {assetInfo2.map((info) => (
              <HStack spacing="12px" alignItems="center">
                <Text color="neutral.600" width="95px" size="md">
                  {info.label}
                </Text>
                <Text color="black" size="md">
                  {info.value}
                </Text>
              </HStack>
            ))}
            <HStack alignItems="flex-start" spacing="12px">
              <Text color="neutral.600" width="95px" size="md">
                Barcode:
              </Text>
              <Flex bgColor="white" height="71px" width="175px">
                <ReactBarcode
                  value={assetId ? assetId.toString() : ''}
                  renderer={Renderer.CANVAS}
                  options={{ displayValue: false }}
                  style={{ width: '100%' }}
                />
              </Flex>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Overview;

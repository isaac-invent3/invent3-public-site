import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const AssetDetails = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    assetName,
    assetId,
    assetCategory,
    modelRef,
    brandName,
    primaryImage,
  } = assetData;

  const info1 = [
    {
      label: 'Asset ID',
      value: assetId ?? 'N/A',
    },
    {
      label: 'Category',
      value: assetCategory ?? 'N/A',
    },
  ];

  const info2 = [
    {
      label: 'Make',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model',
      value: modelRef ?? 'N/A',
    },
  ];

  return (
    <VStack spacing="16px" alignItems="flex-start" width="full">
      <DetailHeader variant="secondary">Asset Details</DetailHeader>
      <HStack spacing="16px" alignItems="flex-start">
        <Flex
          position="relative"
          width="123px"
          height="100px"
          overflow="hidden"
          rounded="12px"
          bgColor="neutral.100"
          flexShrink={0}
        >
          <Image
            src={`data:image/jpeg;base64,${primaryImage}`}
            fill
            alt="Asset image"
          />
        </Flex>
        <VStack spacing="16px" alignItems="flex-start">
          <Heading as="h4" fontSize="24px" lineHeight="28.51px" color="black">
            {assetName}
          </Heading>
          <VStack spacing="8px" alignItems="flex-start">
            {info1.map((item) => (
              <HStack key={item.label} spacing="48px">
                <Text
                  size="md"
                  fontWeight={800}
                  minW="65px"
                  color="neutral.600"
                >
                  {item.label}
                </Text>
                <Text size="md" fontWeight={800} color="black">
                  {item.value}
                </Text>
              </HStack>
            ))}
            {info2.map((item) => (
              <HStack key={item.label} spacing="48px">
                <Text size="md" minW="65px" color="neutral.600">
                  {item.label}
                </Text>
                <Text size="md" color="black">
                  {item.value}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AssetDetails;

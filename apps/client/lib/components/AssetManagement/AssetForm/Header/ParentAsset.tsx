import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import { useAppSelector } from '~/lib/redux/hooks';

const ParentAsset = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const {
    assetName,
    assetId,
    assetCategory,
    primaryImage,
    primaryImagePrefix,
    noOfChildAssets,
  } = assetData;

  const assetInfo = [
    {
      label: 'Asset ID',
      value: assetId,
    },
    {
      label: 'Category',
      value: assetCategory,
    },
    {
      label: 'No. of Child Asset',
      value: noOfChildAssets ?? 0,
    },
  ];
  return (
    <HStack spacing="13px" alignItems="flex-start">
      <VStack alignItems="flex-start" spacing="8px" maxW="120px">
        <Text size="md" fontWeight={700} color="primary.500">
          Parent Asset
        </Text>
        <Text color="neutral.600">
          You are adding a child asset to the Parent Asset
        </Text>
      </VStack>
      <HStack spacing="16px" alignItems="flex-start">
        <Flex
          position="relative"
          width="123px"
          height="92px"
          overflow="hidden"
          rounded="10px"
          bgColor="white"
          flexShrink={0}
        >
          <Image
            src={`${primaryImagePrefix}${primaryImage}`}
            fill
            alt="Parent asset image"
          />
        </Flex>
        <VStack alignItems="flex-start" spacing="8px">
          <Heading as="h4" size="lg" fontWeight={700} color="black">
            {assetName}
          </Heading>
          <VStack spacing="4px" alignItems="flex-start">
            {assetInfo.map((item) => (
              <HStack spacing="8px" key={item.label}>
                <Text minW="107px" color="neutral.600" fontWeight={800}>
                  {item.label}
                </Text>
                <Text fontWeight={800} color="black">
                  {item.value}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </HStack>
    </HStack>
  );
};

export default ParentAsset;

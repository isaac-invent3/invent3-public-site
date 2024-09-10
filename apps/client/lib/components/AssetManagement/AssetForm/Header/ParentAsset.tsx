import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
// import Image from 'next/image';
import React from 'react';
import { useAppSelector } from '~/lib/redux/hooks';

const ParentAsset = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const { assetName, assetId, assetCategory } = assetData;

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
      value: 1,
    },
  ];
  return (
    <HStack spacing="13px" alignItems="flex-start">
      <VStack alignItems="flex-start" spacing="8px" maxW="120px">
        <Text size="md" fontWeight={700} color="primary.main">
          Parent
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
        >
          {/* <Image src="" fill alt="Parent asset image" /> */}
        </Flex>
        <VStack alignItems="flex-start" spacing="8px">
          <Heading
            as="h4"
            fontSize="24px"
            lineHeight="28.51px"
            fontWeight={700}
            color="black"
          >
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

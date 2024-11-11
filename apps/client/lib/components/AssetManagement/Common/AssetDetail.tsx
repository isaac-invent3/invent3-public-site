import { Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface AssetDetailsProps {
  stackType: 'row' | 'column';
  showStatus: boolean;
  customStyle?: { [key: string]: unknown };
}
const AssetDetails = (props: AssetDetailsProps) => {
  const { stackType, showStatus, customStyle } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    assetName,
    assetId,
    assetCategory,
    modelRef,
    brandName,
    primaryImage,
    currentStatus,
    displayColorCode,
  } = assetData;

  const info1 = [
    {
      label: 'Asset ID:',
      value: assetId ?? 'N/A',
    },
    {
      label: 'Category:',
      value: assetCategory ?? 'N/A',
    },
  ];

  const info2 = [
    {
      label: 'Make:',
      value: brandName ?? 'N/A',
    },
    {
      label: 'Model:',
      value: modelRef ?? 'N/A',
    },
  ];

  return (
    <VStack
      spacing="16px"
      alignItems="flex-start"
      width="full"
      {...customStyle}
    >
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
          <HStack spacing="24px">
            <Heading as="h4" fontSize="24px" lineHeight="28.51px" color="black">
              {assetName}
            </Heading>
            {showStatus && (
              <GenericStatusBox
                text={currentStatus}
                colorCode={displayColorCode}
              />
            )}
          </HStack>
          <Stack direction={stackType} rowGap="8px" columnGap="72px">
            <VStack spacing="8px" alignItems="flex-start">
              {info1.map((item) => (
                <HStack key={item.label} spacing="48px" alignItems="flex-start">
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
            </VStack>
            <VStack spacing="8px" alignItems="flex-start">
              {info2.map((item) => (
                <HStack key={item.label} spacing="48px" alignItems="flex-start">
                  <Text size="md" minW="65px" color="neutral.600">
                    {item.label}
                  </Text>
                  <Text size="md" color="black">
                    {item.value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Stack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AssetDetails;

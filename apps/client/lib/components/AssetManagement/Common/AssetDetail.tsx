import {
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import GenericStatusBox from '../../UI/GenericStatusBox';
import { Button } from '@repo/ui/components';
import React from 'react';
import AssetDetail from '../AssetDetail';

interface AssetDetailsProps {
  stackType: 'row' | 'column';
  showStatus: boolean;
  customStyle?: { [key: string]: unknown };
  children?: React.ReactNode;
}
const AssetDetails = (props: AssetDetailsProps) => {
  const { stackType, showStatus, customStyle, children } = props;
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <VStack
        spacing="16px"
        alignItems="flex-start"
        width="full"
        {...customStyle}
        position="relative"
      >
        <DetailHeader variant="secondary" customStyles={{ fontWeight: 700 }}>
          Asset Details
        </DetailHeader>

        <Button
          variant="outline"
          customStyles={{
            height: '28px',
            width: 'max-content',
            paddingX: '12px',
            position: 'absolute',
            right: 0,
            top: '-14px',
          }}
          handleClick={onOpen}
        >
          View Full Asset Details
        </Button>
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
              <Heading
                as="h4"
                fontSize="24px"
                lineHeight="28.51px"
                color="black"
              >
                {assetName}
              </Heading>
              {showStatus && (
                <GenericStatusBox
                  text={currentStatus}
                  colorCode={displayColorCode}
                />
              )}
            </HStack>
            <HStack alignItems="flex-start" flexWrap="wrap" gap="32px">
              <Stack direction={stackType} rowGap="8px" columnGap="72px">
                <VStack spacing="8px" alignItems="flex-start">
                  {info1.map((item) => (
                    <HStack
                      key={item.label}
                      spacing="48px"
                      alignItems="flex-start"
                    >
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
                    <HStack
                      key={item.label}
                      spacing="48px"
                      alignItems="flex-start"
                    >
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
              {children}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      <AssetDetail data={assetData} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default AssetDetails;

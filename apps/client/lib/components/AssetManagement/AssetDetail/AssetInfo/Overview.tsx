import { Flex, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { ReactBarcode, Renderer } from 'react-jsbarcode';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { useAppSelector } from '~/lib/redux/hooks';

const Overview = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }

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
    displayColorCode,
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
    <Stack
      width="full"
      py={{ base: '16px', md: '24px' }}
      px={{ base: '16px', md: '32px' }}
      bgColor="#B4BFCA4D"
      spacing="24px"
      alignItems="flex-start"
      direction={{ base: 'column', sm: 'row' }}
    >
      <Flex
        height={{ base: '97px', md: '175px' }}
        width={{ base: '120px', md: '216px' }}
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
            size={{ base: 'lg', md: 'xl' }}
            fontWeight={{ base: 700, md: 800 }}
          >
            {assetName}
          </Heading>
        </HStack>
        <Stack
          width="full"
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '8px', md: '42px' }}
          alignItems="flex-start"
        >
          <VStack alignItems="flex-start" spacing="8px">
            <HStack spacing="8px" alignItems="center">
              <Text
                color="neutral.600"
                minW={{ base: '95px', md: '65px' }}
                size="md"
              >
                Status:
              </Text>
              <GenericStatusBox
                text={currentStatus}
                colorCode={displayColorCode}
              />
            </HStack>
            <HStack spacing="8px" alignItems="flex-start">
              <Text
                size="md"
                color="neutral.600"
                minW={{ base: '95px', md: '65px' }}
              >
                Asset ID:
              </Text>
              <Text size="md" color="black">
                {assetId}
              </Text>
            </HStack>
            <HStack spacing="8px" alignItems="flex-start">
              <Text
                color="neutral.600"
                size="md"
                minW={{ base: '95px', md: '65px' }}
                whiteSpace="nowrap"
              >
                Category:
              </Text>
              <Text size="md" color="black">
                {assetCategory}
              </Text>
            </HStack>
            {assetInfo1.map((info, index) => (
              <HStack spacing="8px" alignItems="flex-start" key={index}>
                <Text
                  color="neutral.600"
                  minW={{ base: '95px', md: '65px' }}
                  size="md"
                >
                  {info.label}
                </Text>
                <Text color="black" size="md">
                  {info.value}
                </Text>
              </HStack>
            ))}
          </VStack>
          <VStack alignItems="flex-start" spacing="8px">
            {assetInfo2.map((info, index) => (
              <HStack spacing="12px" alignItems="flex-start" key={index}>
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
              <Flex
                bgColor="white"
                height={{ base: '37px', md: '71px' }}
                width={{ base: '92px', md: '175px' }}
              >
                <ReactBarcode
                  value={assetId ? assetId.toString() : ''}
                  renderer={Renderer.CANVAS}
                  options={{ displayValue: false, margin: 0 }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Flex>
            </HStack>
          </VStack>
        </Stack>
      </VStack>
    </Stack>
  );
};

export default Overview;

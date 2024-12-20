import { Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';

import CurrentOwner from './CurrentOwner';
import AssetDetailWrapper from '../../Common/AssetDetailWrapper';
import { useAppSelector } from '~/lib/redux/hooks';
import DetailSection from '../../AssetDetail/DetailSection';

const SectionOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const {
    assetId,
    countryName,
    stateName,
    lganame,
    facilityName,
    buildingName,
    floorName,
    departmentName,
    roomName,
    aisleName,
    shelfName,
    currentCondition,
    assetCategory,
    brandName,
    modelRef,
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
    <Flex gap="44px" width="full">
      <Flex width="40%" pt="14px">
        <CurrentOwner />
      </Flex>
      <Flex width="60%">
        <AssetDetailWrapper showStatus={false}>
          <HStack
            width="full"
            columnGap="56px"
            rowGap="8px"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            <Stack direction="column" rowGap="8px">
              <DetailSection
                details={info1}
                labelMinWidth="65px"
                labelStyle={{ fontWeight: 800 }}
                valueStyle={{ fontWeight: 800 }}
              />
              <DetailSection details={info2} labelMinWidth="65px" />
            </Stack>
            <HStack alignItems="flex-start" spacing="56px">
              <HStack alignItems="flex-start" spacing="16px">
                <Text color="neutral.600" size="md">
                  Location:
                </Text>
                <Text color="black" size="md" lineHeight="22px" maxW="157px">
                  {[
                    countryName,
                    stateName,
                    lganame,
                    facilityName,
                    buildingName,
                    floorName,
                    departmentName,
                    roomName,
                    aisleName,
                    shelfName,
                  ]
                    .filter(Boolean)
                    .join(', ') ?? 'N/A'}
                </Text>
              </HStack>
              <VStack spacing="8px" alignItems="flex-start">
                <Text color="neutral.600" size="md">
                  Condition:
                </Text>
                <Text color="black" size="md" lineHeight="22px">
                  {currentCondition ?? 'N/A'}
                </Text>
              </VStack>
            </HStack>
          </HStack>
        </AssetDetailWrapper>
      </Flex>
    </Flex>
  );
};

export default SectionOne;

import { HStack, Text, VStack } from '@chakra-ui/react';

import AssetDetails from '../../Common/AssetDetailWrapper';
import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter } from '~/lib/utils/Formatters';
import moment from 'moment';
import DetailSection from '../../AssetDetail/DetailSection';

const SectionOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  if (!assetData) {
    return null;
  }
  const {
    assetId,
    assetCategory,
    brandName,
    modelRef,
    initialValue,
    currentCost,
    purchaseDate,
  } = assetData;

  const assetAge = moment().diff(moment(purchaseDate), 'years');

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

  const info3 = [
    {
      label: 'Purchase Price:',
      value: initialValue ? amountFormatter(initialValue) : 'N/A',
    },
    {
      label: 'Current Price:',
      value: currentCost ? amountFormatter(currentCost) : 'N/A',
    },
  ];

  const info4 = [
    {
      label: 'Purchase Price:',
      value: purchaseDate ? moment(purchaseDate).format('YYYY') : 'N/A',
    },
    {
      label: 'Asset Age:',
      value: purchaseDate ? `${assetAge < 10 ? '0' : ''}${assetAge}` : 'N/A',
    },
  ];

  return (
    <HStack
      width="full"
      spacing="24px"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <AssetDetails showStatus showMaintenanceHistoryButton>
        <HStack
          alignItems="flex-start"
          width="full"
          justifyContent="space-between"
          spacing="16px"
        >
          <HStack
            width="full"
            flexWrap="wrap"
            columnGap="48px"
            rowGap="20px"
            alignItems="flex-start"
          >
            <HStack
              width="max-content"
              columnGap="48px"
              alignItems="flex-start"
            >
              <DetailSection
                details={info1}
                labelMinWidth="65px"
                wrapperStyle={{ width: 'max-content' }}
                valueStyle={{ fontWeight: 800 }}
                itemContainerStyle={{ spacing: '16px', width: '250px' }}
              />
              <DetailSection
                details={info2}
                labelMinWidth="43px"
                wrapperStyle={{ width: 'max-content' }}
                itemContainerStyle={{ spacing: '16px' }}
              />
            </HStack>
            <HStack
              width="max-content"
              columnGap="48px"
              alignItems="flex-start"
            >
              <DetailSection
                details={info3}
                labelMinWidth="98px"
                wrapperStyle={{ width: 'max-content' }}
                itemContainerStyle={{ spacing: '16px', width: '250px' }}
              />
              <DetailSection
                details={info4}
                labelMinWidth="98px"
                wrapperStyle={{ width: 'max-content' }}
                itemContainerStyle={{ spacing: '16px' }}
              />
            </HStack>
          </HStack>
          <VStack alignItems="flex-start" spacing="8px">
            <Text color="neutral.600" size="md" whiteSpace="nowrap">
              Current Estimated Value
            </Text>
            <Text
              color="black"
              fontWeight={800}
              fontSize="24px"
              lineHeight="28.51px"
            >
              {currentCost ? amountFormatter(currentCost) : 'N/A'}{' '}
            </Text>
          </VStack>
        </HStack>
      </AssetDetails>
    </HStack>
  );
};

export default SectionOne;

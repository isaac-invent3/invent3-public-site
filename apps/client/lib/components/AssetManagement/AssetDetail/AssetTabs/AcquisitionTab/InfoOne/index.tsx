import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../../DetailSection';
import VendorDetails from './VendorDetails';
import { useAppSelector } from '~/lib/redux/hooks';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

const InfoOne = () => {
  const assetData = useAppSelector((state) => state.asset.asset);
  const {
    acquisitionDate,
    resalevalue,
    currentCondition,
    scrapvalue,
    initialValue,
  } = assetData;
  const details = [
    {
      label: 'Acquisition Date:',
      value: acquisitionDate
        ? dateFormatter(acquisitionDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Purchase Price:',
      value: initialValue !== null ? amountFormatter(initialValue) : 'N/A',
    },
    {
      label: 'Resale Value:',
      value: resalevalue !== null ? amountFormatter(resalevalue) : 'N/A',
    },
    {
      label: 'Scrap Value:',
      value: scrapvalue !== null ? amountFormatter(scrapvalue) : 'N/A',
    },
    {
      label: 'Condition:',
      value: currentCondition ?? 'N/A',
    },
  ];
  return (
    <HStack width="full" justifyContent="space-between" spacing="66px">
      <Flex width="min-content" whiteSpace="nowrap">
        <DetailSection minWidth="105px" details={details} />
      </Flex>
      <VendorDetails />
    </HStack>
  );
};

export default InfoOne;

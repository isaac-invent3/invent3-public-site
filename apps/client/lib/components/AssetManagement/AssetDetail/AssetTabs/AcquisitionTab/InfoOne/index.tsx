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
        : '-',
    },
    {
      label: 'Purchase Price:',
      value: initialValue ? amountFormatter(initialValue) : '-',
    },
    {
      label: 'Resale Value:',
      value: amountFormatter(resalevalue),
    },
    {
      label: 'Scrap Value:',
      value: amountFormatter(scrapvalue),
    },
    {
      label: 'Condition:',
      value: currentCondition ?? '-',
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

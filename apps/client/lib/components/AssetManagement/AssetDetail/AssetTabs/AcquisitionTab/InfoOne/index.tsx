import { Flex, HStack, Skeleton } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../../DetailSection';
import VendorDetails from './VendorDetails';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { AcquisitionInfo } from '~/lib/interfaces/asset.interfaces';

interface InfoOneProps {
  isLoading: boolean;
  data: AcquisitionInfo;
}
const InfoOne = (props: InfoOneProps) => {
  const { isLoading, data } = props;

  const details = [
    {
      label: 'Acquisition Date:',
      value: data?.acquisitionDate
        ? dateFormatter(data?.acquisitionDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Purchase Price:',
      value:
        data?.initialValue !== null
          ? amountFormatter(data?.initialValue)
          : 'N/A',
    },
    {
      label: 'Resale Value:',
      value:
        data?.resalevalue !== null ? amountFormatter(data?.resalevalue) : 'N/A',
    },
    {
      label: 'Scrap Value:',
      value:
        data?.scrapvalue !== null ? amountFormatter(data?.scrapvalue) : 'N/A',
    },
    {
      label: 'Condition:',
      value: data?.conditionName ?? 'N/A',
    },
  ];
  return (
    <HStack
      width="full"
      justifyContent="space-between"
      spacing="66px"
      alignItems="flex-start"
    >
      <Flex width="min-content" whiteSpace="nowrap">
        <Skeleton isLoaded={!isLoading} width="full">
          <DetailSection minWidth="105px" details={details} />
        </Skeleton>
      </Flex>
      <Skeleton isLoaded={!isLoading} width="full" rounded="8px" height="full">
        <VendorDetails data={data} />
      </Skeleton>
    </HStack>
  );
};

export default InfoOne;

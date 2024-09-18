import { Flex, HStack, Skeleton } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '../../DetailSection';
import { AcquisitionInfo } from '~/lib/interfaces/asset.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface InfoTwoProps {
  isLoading: boolean;
  data: AcquisitionInfo;
}
const InfoTwo = (props: InfoTwoProps) => {
  const { isLoading, data } = props;
  const details1 = [
    {
      label: 'Start Date:',
      value: data?.purchaseDate
        ? dateFormatter(data?.purchaseDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'End Date:',
      value: data?.expiryDate
        ? dateFormatter(data?.expiryDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Warranty Terms:',
      value: data?.warrantyDetails ?? 'N/A',
    },
  ];

  const details2 = [
    {
      label: 'Depreciation Start Date:',
      value: data?.depreciationDate
        ? dateFormatter(data?.depreciationDate, 'Do MMM, YYYY')
        : 'N/A',
    },
    {
      label: 'Depreciation Method:',
      value: data?.depreciationMethod ?? 'N/A',
    },
    {
      label: 'Depreciation Rate:',
      value: data?.depreciationRate ?? 'N/A',
    },
  ];

  return (
    <HStack width="full" alignItems="flex-start" spacing="118px">
      <Flex width="max-content">
        <Skeleton isLoaded={!isLoading} width="full">
          <DetailSection
            details={details1}
            minWidth="103px"
            header="Warranty Details"
          />
        </Skeleton>
      </Flex>
      <Flex width="max-content">
        <Skeleton isLoaded={!isLoading} width="full">
          <DetailSection
            details={details2}
            minWidth="151px"
            header="Depreciation Details"
          />
        </Skeleton>
      </Flex>
    </HStack>
  );
};

export default InfoTwo;

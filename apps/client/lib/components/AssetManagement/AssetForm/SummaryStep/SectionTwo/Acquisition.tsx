import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { AssetFormDetails } from '~/lib/interfaces/asset.interfaces';
import Info from './Info';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';

interface AcquisitionProps {
  assetFormDetails: AssetFormDetails;
}
const Acquisition = ({ assetFormDetails }: AcquisitionProps) => {
  const {
    acquisitionDate,
    assetCondition,
    purchasePrice,
    warrantyStartDate,
    warrantyEndDate,
    warrantyTerms,
    paymentTerms,
    depreciationStartDate,
    depreciationMethod,
    depreciationRate,
    vendorId,
    vendorDetail,
  } = assetFormDetails;

  const row1 = [
    {
      label: 'Acquisition Date',
      value: dateFormatter(acquisitionDate, 'Do MMM, YYYY', 'DD/MM/YYYY'),
    },
    {
      label: 'Asset  Condition',
      value: assetCondition,
    },
    {
      label: 'Purchase Price',
      value: amountFormatter(purchasePrice ?? 0),
    },
  ];

  const row2 = [
    {
      label: 'Warranty Start Date',
      value: dateFormatter(warrantyStartDate, 'Do MMM, YYYY', 'DD/MM/YYYY'),
    },
    {
      label: 'Warranty End Date',
      value: dateFormatter(warrantyEndDate, 'Do MMM, YYYY', 'DD/MM/YYYY'),
    },
    {
      label: 'Warranty Terms',
      value: warrantyTerms,
    },
    {
      label: 'Payment Terms',
      value: paymentTerms,
    },
  ];

  const row3 = [
    {
      label: 'Depreciation Start Date',
      value: dateFormatter(depreciationStartDate, 'Do MMM, YYYY', 'DD/MM/YYYY'),
    },
    {
      label: 'Depreciation Method',
      value: depreciationMethod,
    },
    {
      label: 'Depreciation Rate',
      value: `${depreciationRate}%`,
    },
  ];

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Acquisition</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        {/* Row 1  */}
        <SimpleGrid columns={4} width="full">
          {row1.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 2  */}
        <SimpleGrid columns={4} width="full">
          {row2.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Row 3  */}
        <SimpleGrid columns={4} width="full">
          {row3.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Vendor Details Starts */}
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Vendor Details</Text>
          <VStack width="full" alignItems="flex-start" spacing="4px">
            <Text size="lg" color="black" fontWeight={700}>
              {vendorId}
            </Text>
            <Text size="md" color="neutral.600" width="full" maxW="149px">
              {vendorDetail}
            </Text>
          </VStack>
        </VStack>
        {/* Vendor Details Ends */}
      </VStack>
    </VStack>
  );
};

export default Acquisition;

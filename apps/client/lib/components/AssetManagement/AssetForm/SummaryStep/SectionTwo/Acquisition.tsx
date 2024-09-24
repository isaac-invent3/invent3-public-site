import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import Info from './Info';
import { amountFormatter, dateFormatter } from '~/lib/utils/Formatters';
import { useAppSelector } from '~/lib/redux/hooks';

const Acquisition = () => {
  const assetFormDetails = useAppSelector((state) => state.asset.assetForm);
  const {
    acquisitionDate,
    conditionName,
    initialValue,
    warrantyStartDate,
    warrantyEndDate,
    warrantyDetails,
    depreciationStartDate,
    depreciationMethod,
    depreciationRate,
    vendorDetails,
    purchaseDate,
    lifeExpectancy,
    scrapValue,
    resaleValue,
    currentValue,
  } = assetFormDetails;

  const row1 = [
    {
      label: 'Purchase Date',
      value: purchaseDate
        ? dateFormatter(purchaseDate, 'Do MMM, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Purchase Price',
      value: amountFormatter(initialValue ?? 0),
    },
    {
      label: 'Life Expectancy',
      value: lifeExpectancy,
    },
  ];

  const row2 = [
    {
      label: 'Resale Value',
      value: amountFormatter(resaleValue ?? 0),
    },
    {
      label: 'Scrap Value',
      value: amountFormatter(scrapValue ?? 0),
    },
    {
      label: 'Current Value',
      value: amountFormatter(currentValue ?? 0),
    },
  ];

  const row3 = [
    {
      label: 'Acquisition Date',
      value: acquisitionDate
        ? dateFormatter(acquisitionDate, 'Do MMM, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Asset  Condition',
      value: conditionName,
    },
  ];

  const row4 = [
    {
      label: 'Warranty Start Date',
      value: warrantyStartDate
        ? dateFormatter(warrantyStartDate, 'Do MMM, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Warranty End Date',
      value: warrantyEndDate
        ? dateFormatter(warrantyEndDate, 'Do MMM, YYYY', 'DD/MM/YYYY')
        : 'N/A',
    },
    {
      label: 'Warranty Terms',
      value: warrantyDetails,
    },
  ];

  const row5 = [
    {
      label: 'Depreciation Start Date',
      value: depreciationStartDate
        ? dateFormatter(depreciationStartDate, 'Do MMM, YYYY', 'DD/MM/YYYY')
        : 'N/A',
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
        <SimpleGrid columns={4} width="full">
          {row3.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
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
          {row4.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        <SimpleGrid columns={4} width="full">
          {row5.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>
        {/* Vendor Details Starts */}
        <VStack width="full" alignItems="flex-start" spacing="8px">
          <Text color="neutral.600">Vendor Details</Text>
          <VStack width="full" alignItems="flex-start" spacing="4px">
            <Text size="lg" color="black" fontWeight={700}>
              {vendorDetails.vendorName}
            </Text>
            <Text color="neutral.600" size="md">
              {vendorDetails.address}
            </Text>
            <Text color="neutral.600" size="md">
              {vendorDetails.emailAddress}
            </Text>
          </VStack>
        </VStack>
        {/* Vendor Details Ends */}
      </VStack>
    </VStack>
  );
};

export default Acquisition;

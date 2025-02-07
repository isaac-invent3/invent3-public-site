import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const VendorInfo = () => {
  const {
    vendorName,
    categoryName,
    description,
    contactFirstName,
    contactLastName,
    primaryEmail,
    primaryPhoneNumber,
    address1,
    address2,
    countryName,
    stateName,
    cityName,
    postalCode,
  } = useAppSelector((state) => state.vendor.vendorForm);

  const infoOne = [
    {
      label: 'Vendor Name',
      value: vendorName,
    },
    {
      label: 'Vendor Category',
      value: categoryName,
    },
  ];

  const infoTwo = [
    {
      label: 'Primary contact Name',
      value: `${contactFirstName} ${contactLastName}`,
    },
    {
      label: 'Primary Contact Email',
      value: primaryEmail,
    },
    {
      label: 'Primary contact Phone Number',
      value: primaryPhoneNumber,
    },
    {
      label: 'Address 1',
      value: address1,
    },
    {
      label: 'Address 2',
      value: address2,
    },
    {
      label: 'Country',
      value: countryName,
    },
    {
      label: 'State',
      value: stateName,
    },
    {
      label: 'City',
      value: cityName,
    },
    {
      label: 'Postal/Zip Code',
      value: postalCode,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">
        Vendor Info / Contact Information
      </DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={{ base: 1, md: 2, lg: 3 }}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SummaryInfo label="Description" value={description} />
        <SimpleGrid width="full" gap="20px" columns={{ base: 1, md: 2, lg: 3 }}>
          {infoTwo.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default VendorInfo;

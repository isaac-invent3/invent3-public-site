import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const VendorInfo = () => {
  const {
    vendorName,
    vendorCategoryName,
    description,
    contactFirstName,
    contactLastName,
    primaryEmail,
    primaryPhoneNumber,
    address1,
    address2,
    vendorCountryName,
    vendorStateName,
    vendorCityName,
    postalCode,
  } = useAppSelector((state) => state.vendor.vendorForm);

  const infoOne = [
    {
      label: 'Vendor Name',
      value: vendorName,
    },
    {
      label: 'Vendor Category',
      value: vendorCategoryName,
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
      value: vendorCountryName,
    },
    {
      label: 'State',
      value: vendorStateName,
    },
    {
      label: 'City',
      value: vendorCityName,
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
        <SimpleGrid
          width="full"
          gap="20px"
          columns={{ base: 1, setMaxListeners: 2, lg: 3 }}
        >
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SummaryInfo label="Description" value={description} />
        <SimpleGrid width="full" gap="20px" columns={{ base: 1, sm: 2, lg: 3 }}>
          {infoTwo.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default VendorInfo;

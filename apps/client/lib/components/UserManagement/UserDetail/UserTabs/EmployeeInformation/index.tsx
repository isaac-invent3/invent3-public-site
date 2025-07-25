import { Stack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const EmployeeInformation = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const userDetail = useAppSelector((state) => state.user.user);
  if (!userDetail) {
    return;
  }
  const { firstName, lastName, phoneNumber, lganame, stateName, countryName } =
    userDetail;

  const data = [
    { label: 'First Name:', value: firstName },
    { label: 'Last Name:', value: lastName },
    { label: 'Personal Phone:', value: phoneNumber },
  ];
  const addressData = [
    { label: 'City:', value: lganame },
    { label: 'State / Province:', value: stateName },
    { label: 'Country:', value: countryName },
  ];

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      alignItems="flex-start"
      spacing={{ base: '16px', md: '48px' }}
    >
      <DetailSection
        details={data}
        labelMinWidth={isMobile ? '108px' : '99px'}
        outerContainerStyle={{ spacing: '16px' }}
        wrapperStyle={{ width: 'max-content' }}
        itemContainerStyle={{ spacing: '8px' }}
      />
      <DetailSection
        details={addressData}
        labelMinWidth="108px"
        outerContainerStyle={{ spacing: '16px' }}
        wrapperStyle={{ width: 'max-content' }}
        itemContainerStyle={{ spacing: '8px' }}
      />
    </Stack>
  );
};

export default EmployeeInformation;

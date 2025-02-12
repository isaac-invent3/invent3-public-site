import { Stack, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';

const EmployeeInformation = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const data = [
    { label: 'First Name:', value: 'George' },
    { label: 'Last Name:', value: 'Clooney' },
    { label: 'Date of Birth:', value: 'August 23, 1982' },
    { label: 'Personal Phone:', value: '+234 234 567 8901' },
    { label: 'Personal Email:', value: 'email@example.com' },
  ];
  const addressData = [
    { label: 'Address 1:', value: '2972 Westheimer Rd.' },
    { label: 'Address 2:', value: '--' },
    { label: 'City:', value: 'Santa Ana' },
    { label: 'State / Province:', value: 'Illinois' },
    { label: 'Country:', value: 'United States' },
    { label: 'Zip / Postal Code:', value: '85486' },
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

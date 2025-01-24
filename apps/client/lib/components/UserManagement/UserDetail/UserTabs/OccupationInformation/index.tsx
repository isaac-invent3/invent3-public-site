import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';

const OccupationInformation = () => {
  const data = [
    { label: 'Employment Type:', value: 'Full time' },
    { label: 'Team:', value: 'Administrators' },
    { label: 'Branch Location:', value: 'Lekki, Lagos' },
    { label: 'User Role:', value: 'Frontdesk/CSA' },
    { label: 'Job Title:', value: 'Admin Officer' },
  ];

  return (
    <VStack alignItems="flex-start" spacing="16px">
      <DetailSection
        details={data}
        labelMinWidth="114px"
        outerContainerStyle={{ spacing: '16px' }}
        wrapperStyle={{ width: 'max-content' }}
        itemContainerStyle={{ spacing: '16px' }}
      />
    </VStack>
  );
};

export default OccupationInformation;

import { VStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';
import { useAppSelector } from '~/lib/redux/hooks';

const OccupationInformation = () => {
  const userDetail = useAppSelector((state) => state.user.user);
  if (!userDetail) {
    return;
  }
  const { facilityName, userRoles, userGroups } = userDetail;
  const data = [
    { label: 'Employment Type:', value: 'Full time' },
    {
      label: 'Team:',
      value: userGroups?.map((item) => item.groupName).join(', '),
    },
    { label: 'Branch Location:', value: facilityName },
    {
      label: 'User Role:',
      value: userRoles?.map((item) => item.roleName).join(', '),
    },
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

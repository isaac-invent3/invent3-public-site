import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import DetailSection from '~/lib/components/UI/ContentDetails/DetailsSection';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { User } from '~/lib/interfaces/user.interfaces';

interface EmployeeDetailProps {
  data?: User;
}
const EmployeeDetail = ({ data }: EmployeeDetailProps) => {
  if (!data) {
    return;
  }

  const firstColumn = [
    { label: 'Employee ID:', value: '369798' },
    {
      label: 'Email:',
      value: 'George.Clooney@example.com',
    },
    { label: 'Phone:', value: '+234 123 456 7890' },
    { label: 'Branch:', value: 'Admiralty Way, Lekki Epe' },
  ];

  const secondColumn = [
    { label: 'Employee Type::', value: 'Full time ' },
    { label: 'Job Title:', value: 'Admin Officer' },
    {
      label: 'Team:',
      value: 'Administrators',
    },
    { label: 'Hired Date:', value: 'August 22, 2024' },
  ];

  const thirdColumn = [
    { label: 'Worked for', value: '0 years, 4 months' },
    {
      label: 'Employee ID:',
      value: '369798',
    },
    { label: 'NIN:', value: '2752348-09238645' },
  ];
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing="24px">
      <Avatar width="96px" height="96px" />
      <VStack spacing="8px" alignItems="flex-start">
        <Text size="2xl" color="black" fontWeight={800}>
          George Clooney
        </Text>
        <HStack spacing="8px">
          <Text color="neutral.600" minW="81px" size="md">
            Status:
          </Text>
          <GenericStatusBox text="Active" />
        </HStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems="flex-start"
          columnGap={{ base: '24px', md: '48px', lg: '70px' }}
          rowGap={{ base: '24px', md: '48px' }}
          flexWrap="wrap"
        >
          <DetailSection
            details={firstColumn}
            labelMinWidth="81px"
            outerContainerStyle={{ spacing: '16px' }}
            wrapperStyle={{ width: 'max-content' }}
            itemContainerStyle={{ spacing: '8px' }}
          />
          <DetailSection
            details={secondColumn}
            labelMinWidth="98px"
            outerContainerStyle={{ spacing: '16px' }}
            wrapperStyle={{ width: 'max-content' }}
            itemContainerStyle={{ spacing: '8px' }}
          />
          <DetailSection
            details={thirdColumn}
            labelMinWidth="76px"
            outerContainerStyle={{ spacing: '16px' }}
            wrapperStyle={{ width: 'max-content' }}
            itemContainerStyle={{ spacing: '8px' }}
          />
        </Stack>
      </VStack>
    </Stack>
  );
};

export default EmployeeDetail;

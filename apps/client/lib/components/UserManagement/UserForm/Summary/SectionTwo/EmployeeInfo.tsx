import { SimpleGrid, VStack } from '@chakra-ui/react';
import React from 'react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import { dateFormatter } from '~/lib/utils/Formatters';

const EmployeeInfo = () => {
  const {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    mobileNumber,
    personalEmail,
    workEmail,
    address1,
    address2,
    country,
    state,
    city,
    postalCode,
  } = useAppSelector((state) => state.user.userForm);

  const infoOne = [
    {
      label: 'First Name',
      value: firstName,
    },
    {
      label: 'Middle Name',
      value: middleName,
    },
    {
      label: 'Surname',
      value: lastName,
    },
    {
      label: 'Date of Birth',
      value: dob ? dateFormatter(dob, 'MMMM, Do, YYYY', 'DD/MM/YYY') : 'N/A',
    },
    {
      label: 'Gender',
      value: gender,
    },
  ];

  const infoTwo = [
    {
      label: 'Phone Number',
      value: mobileNumber,
    },
    {
      label: 'Personal Email',
      value: personalEmail,
    },
    {
      label: 'Work Email',
      value: workEmail,
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
      value: country,
    },
    {
      label: 'State',
      value: state,
    },
    {
      label: 'City',
      value: city,
    },
    {
      label: 'Postal/Zip Code',
      value: postalCode,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">Employee Info</DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={3}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SimpleGrid width="full" gap="20px" columns={3}>
          {infoTwo.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default EmployeeInfo;

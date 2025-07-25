import { SimpleGrid, VStack } from '@chakra-ui/react';
import SummaryInfo from '~/lib/components/Common/SummaryInfo';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';

const EmployeeInfo = () => {
  const {
    firstName,
    lastName,
    gender,
    mobileNumber,
    workEmail,
    countryName,
    stateName,
    cityName,
    branchName,
  } = useAppSelector((state) => state.user.userForm);

  const infoOne = [
    {
      label: 'First Name',
      value: firstName,
    },
    {
      label: 'Surname',
      value: lastName,
    },
  ];

  const infoTwo = [
    {
      label: 'Phone Number',
      value: mobileNumber,
    },
    {
      label: 'Work Email',
      value: workEmail,
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
      label: 'Facility',
      value: branchName,
    },
  ];
  return (
    <VStack width="full">
      <DetailHeader variant="primary">Employee Info</DetailHeader>
      <VStack width="full" spacing="20px">
        <SimpleGrid width="full" gap="20px" columns={{ base: 2, md: 3 }}>
          {infoOne.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
        <SimpleGrid width="full" gap="20px" columns={{ base: 2, md: 3 }}>
          {infoTwo.map((item, index) => (
            <SummaryInfo {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default EmployeeInfo;

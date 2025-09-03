import { SimpleGrid, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';
import { AdminFormDetails } from '~/lib/interfaces/company.interfaces';

const SingleContact = (info: AdminFormDetails) => {
  const finalInfo = [
    {
      label: 'Contact First Name',
      value: info?.contactFirstName,
    },
    {
      label: 'Contact Last Name',
      value: info?.contactLastName,
    },
    {
      label: 'Contact Email',
      value: info?.contactEmail,
    },
    {
      label: 'Contact Number',
      value: info?.contactPhoneNumber,
    },
  ];
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      width="full"
      gap="16px"
      bgColor="white"
      p="8px"
      rounded="8px"
    >
      {finalInfo.map((item, index) => (
        <Info {...item} key={index} />
      ))}
    </SimpleGrid>
  );
};

const ContactInformation = () => {
  const { admins } = useAppSelector((state) => state.company.companyForm);

  return (
    <VStack
      spacing="8px"
      width="full"
      alignItems="flex-start"
      bgColor="#F5F5F5"
      height="full"
      rounded="16px"
      p="16px"
      pb={{ lg: '118px' }}
    >
      <DetailHeader variant="primary">Contact Administrator(s)</DetailHeader>
      <VStack width="full" spacing="8px" alignItems="flex-start">
        {admins.map((item, index) => (
          <SingleContact {...item} key={index} />
        ))}
      </VStack>
    </VStack>
  );
};

export default ContactInformation;

import { SimpleGrid, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';

const ContactInformation = () => {
  const { contactFirstName, contactLastName, contactPhoneNumber } =
    useAppSelector((state) => state.company.companyForm);

  const info = [
    {
      label: 'Company Name',
      value: `${contactFirstName} ${contactLastName}`,
    },
    {
      label: 'Company Email',
      value: contactFirstName,
    },
    {
      label: 'Company Number',
      value: contactPhoneNumber,
    },
  ];

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Contact Information</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        <SimpleGrid columns={{ base: 1, md: 2 }} width="full" gap="16px">
          {info.map((item, index) => (
            <Info {...item} key={index} />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default ContactInformation;

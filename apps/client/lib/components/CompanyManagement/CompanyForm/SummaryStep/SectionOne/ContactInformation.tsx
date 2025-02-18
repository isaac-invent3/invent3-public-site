import { Grid, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';

const ContactInformation = () => {
  const { contactInformation } = useAppSelector(
    (state) => state.company.companyForm
  );

  const row1 = contactInformation.map((item) => {
    return [
      {
        label: 'Company Name',
        value: `${item.contactFirstName} ${item.contactLastName}`,
      },
      {
        label: 'Company Email',
        value: item.contactFirstName,
      },
      {
        label: 'Company Number',
        value: item.contactPhoneNumber,
      },
      {
        label: 'Job Title',
        value: item.contactJobTitle,
      },
    ];
  });
 
  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Contact Information</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        {/* Row 1  */}
        {/* <SimpleGrid columns={4} width="full">
          {row1.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid> */}

     
      </VStack>
    </VStack>
  );
};

export default ContactInformation;

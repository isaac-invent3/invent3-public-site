import { Grid, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import DetailHeader from '~/lib/components/UI/DetailHeader';
import { useAppSelector } from '~/lib/redux/hooks';
import Info from './Info';

const CompanyInfo = () => {
  const {
    companyName,
    companyEmail,
    industryType,
    companyWebsite,
    registrationNumber,
    address1,
    countryName,
    stateName,
    lgaName,
  } = useAppSelector((state) => state.company.companyForm);

  const row1 = [
    {
      label: 'Company Name',
      value: companyName,
    },
    {
      label: 'Registration Number',
      value: registrationNumber,
    },
  ];
  const row2 = [
    {
      label: 'Company Website',
      value: companyWebsite,
    },
    {
      label: 'Industry Type',
      value: industryType,
    },
    {
      label: 'Company Email',
      value: companyEmail,
    },
  ];

  const row3 = [
    {
      label: 'Physical Address',
      value: [address1, countryName, stateName, lgaName]
        .filter(Boolean)
        .join(', '),
    },
  ];

  return (
    <VStack spacing="8px" width="full" alignItems="flex-start">
      <DetailHeader variant="primary">Company Info</DetailHeader>
      <VStack width="full" spacing="24px" alignItems="flex-start">
        {/* Row 1  */}
        <SimpleGrid columns={4} width="full">
          {row1.map((item) => (
            <Info {...item} key={item.label} />
          ))}
        </SimpleGrid>

        {/* Row 2  */}
        <Grid templateColumns="repeat(4, 1fr)" width="full">
          <GridItem colSpan={3} width="full">
            <HStack width="full" spacing="16px" alignItems="flex-start">
              {row2.map((item) => (
                <Info {...item} key={item.label} />
              ))}
            </HStack>
          </GridItem>
        </Grid>
        {/* Row 3  */}
        <Grid templateColumns="repeat(4, 1fr)" width="full">
          <GridItem colSpan={2} width="full">
            <HStack width="full" spacing="16px" alignItems="flex-start">
              {row3.slice(0, 2).map((item) => (
                <Info {...item} key={item.label} />
              ))}
            </HStack>
          </GridItem>
          <GridItem colSpan={2} width="full">
            {row3.slice(2).map((item) => (
              <Info {...item} key={item.label} />
            ))}
          </GridItem>
        </Grid>
      </VStack>
    </VStack>
  );
};

export default CompanyInfo;

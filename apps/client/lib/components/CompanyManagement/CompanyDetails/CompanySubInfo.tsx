import { Grid, GridItem, Stack, Text, VStack } from '@chakra-ui/react';
import UploadStatusTable from '../DataUpload/UploadStatusTable';
import { useAppSelector } from '~/lib/redux/hooks';

const CompanySubInfo = () => {
  const complianceStatusData = [
    ['ISO 27001', '28 March 2025', 'Verified'],
    ['GDPR', '28 March 2025', 'Pending'],
  ];
  const company = useAppSelector((state) => state.company.company);
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      w="full"
      flexWrap="wrap"
      justifyContent="space-between"
      spacing="32px"
      mb="3em"
    >
      <VStack flex={{ base: 1, md: 2 }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Contact Person
        </Text>
        <UploadStatusTable
          headers={['Name', 'Role', 'Email']}
          data={[
            [
              `${company?.contactPersonFirstName ?? ''} ${company?.contactPersonLastName ?? ''}`,
              'Admin',
              `${company?.contactPersonEmail ?? ''}`,
            ],
          ]}
          containerProps={{ flex: { base: 1, md: 2 } }}
        />
      </VStack>
      <VStack flex={{ base: 1, md: 2 }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Compliance Status
        </Text>
        <UploadStatusTable
          headers={['Requirement', 'Last Updated', 'Status']}
          data={complianceStatusData}
        />
      </VStack>
      <Grid
        bgColor="white"
        p="16px"
        rounded="8px"
        flex={1}
        gap="16px"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <GridItem colSpan={1} width="full">
          <VStack alignItems="start">
            <Text size="md" color="neutral.600">
              Total Assets Count
            </Text>
            <Text size="lg" color="black">
              300,000
            </Text>
          </VStack>
        </GridItem>

        <GridItem colSpan={1} width="full">
          <VStack alignItems="start">
            <Text size="md" color="neutral.600">
              Total Assets Count
            </Text>
            <Text size="lg" color="black">
              300,000
            </Text>
          </VStack>
        </GridItem>

        <GridItem colSpan={1} width="full">
          <VStack alignItems="start">
            <Text size="md" color="neutral.600">
              Total Users
            </Text>
            <Text size="lg" color="black">
              500
            </Text>
          </VStack>
        </GridItem>

        <GridItem colSpan={1} width="full">
          <VStack alignItems="start">
            <Text size="md" color="neutral.600">
              Total Users
            </Text>
            <Text size="lg" color="black">
              500
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default CompanySubInfo;

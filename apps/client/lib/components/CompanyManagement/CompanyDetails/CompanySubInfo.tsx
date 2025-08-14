import {
  Grid,
  GridItem,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import UploadStatusTable from '../DataUpload/UploadStatusTable';
import { useAppSelector } from '~/lib/redux/hooks';
import { useGetTenantAssetAndUserCountQuery } from '~/lib/redux/services/company.services';

const CompanySubInfo = () => {
  const complianceStatusData = [
    ['ISO 27001', '28 March 2025', 'Verified'],
    ['GDPR', '28 March 2025', 'Pending'],
  ];
  const company = useAppSelector((state) => state.company.company);
  const { data, isLoading } = useGetTenantAssetAndUserCountQuery({
    tenantName: company?.tenantName!,
  });

  const tenantData = [
    {
      label: 'Total Asset Count',
      value: data?.data?.totalAssets
        ? data?.data?.totalAssets?.toLocaleString()
        : 'N/A',
    },
    {
      label: 'Total Users',
      value: data?.data?.totalUsers
        ? data?.data?.totalUsers?.toLocaleString()
        : 'N/A',
    },
  ];
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      w="full"
      flexWrap="wrap"
      justifyContent="space-between"
      spacing="32px"
    >
      <VStack flex={{ base: 1, md: 2 }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Contact Person
        </Text>
        <UploadStatusTable
          headers={['Name', 'Role', 'Email']}
          data={[
            [
              [
                company?.contactPersonFirstName,
                company?.contactPersonLastName,
              ].filter(Boolean).length > 0
                ? `${company?.contactPersonFirstName ?? ''} ${company?.contactPersonLastName ?? ''}`
                : 'N/A',
              'Admin',
              `${company?.contactPersonEmail ?? 'N/A'}`,
            ],
          ]}
          customTableContainerStyle={{ bgColor: 'transparent' }}
        />
      </VStack>
      <VStack flex={{ base: 1, md: 2 }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Compliance Status
        </Text>
        <UploadStatusTable
          headers={['Requirement', 'Last Updated', 'Status']}
          data={complianceStatusData}
          customTableContainerStyle={{ bgColor: 'transparent' }}
        />
      </VStack>
      <Skeleton isLoaded={!isLoading} rounded="8px">
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
          height="full"
        >
          {tenantData.map((item, index) => (
            <GridItem colSpan={1} width="full" key={index}>
              <VStack alignItems="start">
                <Text size="md" color="neutral.600">
                  {item.label}
                </Text>
                <Text size="lg" color="black">
                  {item.value}
                </Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Skeleton>
    </Stack>
  );
};

export default CompanySubInfo;

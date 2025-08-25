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
import {
  useGetCompanyComplianceStatusQuery,
  useGetTenantAssetAndUserCountQuery,
} from '~/lib/redux/services/company.services';
import { COMPANY_COMPLIANCE_ENUM, ROUTES } from '~/lib/utils/constants';
import Link from 'next/link';

const CompanySubInfo = () => {
  const company = useAppSelector((state) => state.company.company);
  const { data, isLoading } = useGetTenantAssetAndUserCountQuery({
    tenantName: company?.tenantName!,
  });
  const { data: complianceStatus, isLoading: isLoadingCompliance } =
    useGetCompanyComplianceStatusQuery({
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
      width="full"
      flexWrap="wrap"
      justifyContent="space-between"
      spacing="32px"
    >
      <VStack flex={1} width={{ base: 'full', md: '50%' }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Contact Person
        </Text>
        <UploadStatusTable
          headers={['Name', 'Role', 'Email']}
          data={[
            [
              company?.contactPersonName ?? 'N/A',
              'Admin',
              `${company?.contactPersonEmail ?? 'N/A'}`,
            ],
          ]}
          customTableContainerStyle={{ bgColor: 'transparent' }}
        />
      </VStack>
      <VStack
        alignItems="flex-start"
        flex={1}
        width={{ base: 'full', md: '25%' }}
        height="full"
      >
        <Text size="md" fontWeight={700} color="primary.500">
          Company Compliance Status
        </Text>
        <Skeleton isLoaded={!isLoadingCompliance} rounded="8px" width="full">
          <VStack
            bgColor="#EEEEEE"
            py="8px"
            px="16px"
            rounded="8px"
            spacing="8px"
            width="full"
            alignItems="flex-start"
            height="full"
            minH="76px"
          >
            <Text size="xl" lineHeight="100%" color="black">
              {complianceStatus?.data === COMPANY_COMPLIANCE_ENUM.COMPLIANT &&
                'Compliant'}
              {complianceStatus?.data ===
                COMPANY_COMPLIANCE_ENUM.NON_COMPLIANT && 'Not Compliant'}
              {complianceStatus?.data ===
                COMPANY_COMPLIANCE_ENUM.NOT_APPLICABLE && 'Not Applicable'}
            </Text>
            {complianceStatus?.data ===
              COMPANY_COMPLIANCE_ENUM.NON_COMPLIANT && (
              <Link href={`/${ROUTES.COMPLIANCE}`}>
                <Text color="blue.500" size="md">
                  Check Assets for the non-compliants
                </Text>
              </Link>
            )}
          </VStack>
        </Skeleton>
      </VStack>
      <VStack flex={1} width={{ base: 'full', md: '25%' }} alignItems="start">
        <Text size="md" fontWeight={700} color="primary.500">
          Company Assets
        </Text>
        <Skeleton isLoaded={!isLoading} rounded="8px">
          <Grid
            bgColor="#EEEEEE"
            p="16px"
            rounded="8px"
            flex={1}
            gap="16px"
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            {tenantData.map((item, index) => (
              <GridItem colSpan={1} width="full" key={index}>
                <VStack alignItems="flex-start" spacing="8px">
                  <Text
                    size="md"
                    color="primary.500"
                    fontWeight={700}
                    // minH="40px"
                  >
                    {item.label}
                  </Text>
                  <Text size="xl" lineHeight="100%" color="black">
                    {item.value}
                  </Text>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        </Skeleton>
      </VStack>
    </Stack>
  );
};

export default CompanySubInfo;

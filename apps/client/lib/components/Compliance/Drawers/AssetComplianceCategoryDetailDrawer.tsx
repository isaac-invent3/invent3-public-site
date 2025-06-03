import {
  DrawerBody,
  DrawerHeader,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  DataTable,
  GenericDrawer,
  LoadingSpinner,
} from '@repo/ui/components';
import GenericErrorState from '../../UI/GenericErrorState';
import { useGetComplianceAssetCategoryDetailsQuery } from '~/lib/redux/services/asset/compliance.services';
import { useParams } from 'next/navigation';
import { createColumnHelper } from '@tanstack/react-table';
import { Policy } from '~/lib/interfaces/asset/compliance.interfaces';
import { useMemo } from 'react';
import { InfoIcon } from '../../CustomIcons';

const RegulatoryPolicy = (data: Policy) => {
  return (
    <VStack spacing="4px" alignItems="flex-start" maxW="252px">
      <Text color="primary.500" lineHeight="100%" fontWeight={700} size="md">
        {data?.standard}
      </Text>
      <Text color="primary.500" fontWeight={400}>
        {data?.typeName ?? ''}
      </Text>
    </VStack>
  );
};

interface AssetComplianceCategoryDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssetComplianceCategoryDetailDrawer = ({
  isOpen,
  onClose,
}: AssetComplianceCategoryDetailDrawerProps) => {
  const params = useParams();
  const facilityId = Number(params?.facilityId);
  const assetCategoryId = Number(params?.id);
  const columnHelper = createColumnHelper<Policy>();

  const { data, isLoading, isError } =
    useGetComplianceAssetCategoryDetailsQuery(
      { facilityId: facilityId!, assetCategoryId: assetCategoryId! },
      {
        skip: !assetCategoryId || !facilityId,
      }
    );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('standard', {
          cell: (info) => RegulatoryPolicy(info.row.original),
          header: 'Regulatory/Policy',
          enableSorting: false,
        }),
        columnHelper.accessor('frequency', {
          cell: (info) => (
            <Text color="neutral.600" fontWeight={400}>
              {info.getValue() ?? 'N/A'}
            </Text>
          ),
          header: 'Frequency',
          enableSorting: false,
        }),
        columnHelper.accessor('complianceStatusId', {
          cell: () => <Icon as={InfoIcon} boxSize="16px" color="blue.500" />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.policies]] //eslint-disable-line
  );

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="519px"
      customStyle={{ trapFocus: true }}
    >
      {isError && !isLoading && (
        <GenericErrorState
          title="Error: Not Found!"
          subtitle="The Asset Compliance Could not be found"
        />
      )}

      {isLoading && (
        <VStack width="full" minH="100vh" justifyContent="center">
          <LoadingSpinner />
        </VStack>
      )}

      {data && !isLoading && (
        <>
          <DrawerHeader
            px={{ base: '16px', lg: '24px' }}
            pt="16px"
            pb={{ base: '16px', lg: '44px' }}
          >
            <BackButton handleClick={onClose} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing={{ base: '40px' }}
              px="24px"
              position="relative"
              zIndex={999}
            >
              <VStack alignItems="flex-start" spacing="16px">
                <Text
                  color="primary.500"
                  fontWeight={800}
                  fontSize="24px"
                  lineHeight="100%"
                >
                  Total Compliance Policies
                </Text>
                <HStack spacing="16px" width="full">
                  <Text color="neutral.700">Asset Category Name: </Text>
                  <Text size="md" fontWeight={800} lineHeight="100%">
                    {data?.data?.categoryName ?? 'N/A'}
                  </Text>
                </HStack>
              </VStack>

              <DataTable
                columns={columns}
                data={data?.data?.policies ?? []}
                isLoading={isLoading}
                showFooter={false}
                maxTdWidth="260px"
                customThStyle={{
                  paddingLeft: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontWeight: 700,
                }}
                customTdStyle={{
                  paddingLeft: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                }}
              />
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default AssetComplianceCategoryDetailDrawer;

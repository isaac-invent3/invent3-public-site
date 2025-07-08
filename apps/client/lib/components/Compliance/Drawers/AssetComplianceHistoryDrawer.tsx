import {
  DrawerBody,
  DrawerHeader,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  BackButton,
  DataTable,
  GenericDrawer,
  LoadingSpinner,
} from '@repo/ui/components';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import { useGetAssetComplianceAuditLogQuery } from '~/lib/redux/services/asset/compliance.services';
import { createColumnHelper } from '@tanstack/react-table';
import { ComplianceAuditLogsByAsset } from '~/lib/interfaces/asset/compliance.interfaces';
import { useMemo, useState } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';

const RegulatoryPolicy = (data: ComplianceAuditLogsByAsset) => {
  return (
    <VStack spacing="4px" alignItems="flex-start" maxW="252px">
      <Text color="primary.500" lineHeight="100%" fontWeight={700} size="md">
        {data?.compliancePolicyId}
      </Text>
      <Text color="neutral.600" fontWeight={400}>
        {data?.compliancePolicyId ?? ''}
      </Text>
    </VStack>
  );
};

interface AssetComplianceHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    assetId: number;
    assetName: string;
  };
}

const AssetComplianceHistoryDrawer = ({
  isOpen,
  onClose,
  data,
}: AssetComplianceHistoryDrawerProps) => {
  const [pageSize, setPageSize] = useState(1);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_SIZE);
  const columnHelper = createColumnHelper<ComplianceAuditLogsByAsset>();
  const {
    data: auditLogs,
    isLoading,
    isError,
  } = useGetAssetComplianceAuditLogQuery(
    { assetId: data.assetId!, pageNumber, pageSize },
    {
      skip: !data.assetId,
    }
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('compliancePolicyId', {
          cell: (info) => RegulatoryPolicy(info.row.original),
          header: 'Regulatory/Policy',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-MM-DDTHH:mm:ss'),
          header: 'Review Date',
          enableSorting: false,
        }),
        columnHelper.accessor('performedBy', {
          cell: (info) => info.getValue(),
          header: 'Reviewed By',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[auditLogs?.data?.items]] //eslint-disable-line
  );

  return (
    <GenericDrawer
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="534px"
      customStyle={{ trapFocus: true }}
    >
      {isError && !isLoading && (
        <GenericErrorState
          title="Error: Not Found!"
          subtitle="The Asset Compliance History Could not be found"
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
            pb={{ base: '16px', lg: '39px' }}
          >
            <BackButton handleClick={onClose} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing={{ base: '32px' }}
              position="relative"
              zIndex={999}
            >
              <Heading color="primary.500" fontWeight={800} px="24px">
                Compliance Audit/History
              </Heading>
              <VStack
                alignItems="flex-start"
                justifyContent="center"
                spacing="8px"
                minHeight="151px"
                bgColor="#0E26421A"
                width="full"
                px="24px"
              >
                <HStack spacing="16px">
                  <Text width="48px">Asset ID: </Text>
                  <Text>{data?.assetId ?? '-'}</Text>
                </HStack>
                <Text
                  color="primary.500"
                  fontWeight={800}
                  fontSize="24px"
                  lineHeight="100%"
                >
                  {data?.assetName}
                </Text>
              </VStack>
              <VStack
                alignItems="flex-start"
                spacing="8px"
                width="full"
                px="24px"
              >
                <DataTable
                  columns={columns}
                  data={auditLogs?.data?.items ?? []}
                  isLoading={isLoading}
                  showFooter={auditLogs?.data?.totalPages === 1 ? true : false}
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  setPageNumber={setPageNumber}
                  setPageSize={setPageSize}
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
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default AssetComplianceHistoryDrawer;

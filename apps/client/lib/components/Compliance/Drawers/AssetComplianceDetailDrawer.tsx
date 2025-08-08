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
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import {
  COMPLIANT_STATUS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import GenericErrorState from '../../UI/GenericErrorState';
import { useGetAssetComplianceDetailsQuery } from '~/lib/redux/services/asset/compliance.services';
import { useParams } from 'next/navigation';
import { createColumnHelper } from '@tanstack/react-table';
import { Policy } from '~/lib/interfaces/asset/compliance.interfaces';
import { useMemo } from 'react';
import {
  CompliantCheckIcon,
  InfoIcon,
  NonCompliantIcon,
} from '../../CustomIcons';
import { dateFormatter } from '~/lib/utils/Formatters';

const RegulatoryPolicy = (data: Policy) => {
  return (
    <HStack spacing="8px" alignItems="flex-start">
      <Icon
        as={
          data?.complianceStatusId === COMPLIANT_STATUS.COMPLIANT
            ? CompliantCheckIcon
            : NonCompliantIcon
        }
        boxSize="20px"
      />
      <VStack spacing="4px" alignItems="flex-start" maxW="252px">
        <Text color="primary.500" lineHeight="100%" fontWeight={700} size="md">
          {data?.standard}
        </Text>
        <Text color="neutral.600" fontWeight={400}>
          {data?.typeName ?? ''}
        </Text>
      </VStack>
    </HStack>
  );
};

interface AssetComplianceDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssetComplianceDetailDrawer = ({
  isOpen,
  onClose,
}: AssetComplianceDetailDrawerProps) => {
  const assetComplianceSlug = SYSTEM_CONTEXT_DETAILS.COMPLIANCE.slug;
  const { getSearchParam, clearSearchParamsAfter } = useCustomSearchParams();
  const params = useParams();
  const id = Number(params?.facilityId);
  const columnHelper = createColumnHelper<Policy>();

  const assetId = getSearchParam(assetComplianceSlug)
    ? Number(getSearchParam(assetComplianceSlug))
    : null;

  const { data, isLoading, isError } = useGetAssetComplianceDetailsQuery(
    { facilityId: id!, assetId: assetId! },
    {
      skip: !assetId,
    }
  );

  const closeDrawer = () => {
    clearSearchParamsAfter(assetComplianceSlug, { removeSelf: true });
    onClose();
  };

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
            <VStack alignItems="flex-start">
              <VStack alignItems="flex-start">
                <Text fontWeight={400} color="neutral.600">
                  Start Date:
                </Text>
                <Text fontWeight={700} color="primary.500">
                  {info.row.original?.startDate
                    ? dateFormatter(info.row.original?.startDate, 'DD-MM-YYYY')
                    : 'N/A'}
                </Text>
              </VStack>
              <Text color="neutral.600" fontWeight={400}>
                {info.getValue()}
              </Text>
            </VStack>
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
      onClose={closeDrawer}
      maxWidth="534px"
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
            pb={{ base: '16px', lg: '39px' }}
          >
            <BackButton handleClick={closeDrawer} />
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack
              width="full"
              alignItems="flex-start"
              spacing={{ base: '32px' }}
              px="24px"
              position="relative"
              zIndex={999}
            >
              <VStack alignItems="flex-start" spacing="8px">
                <HStack spacing="16px">
                  <Text width="48px">Asset ID: </Text>
                  <Text>{data?.data?.assetId ?? '-'}</Text>
                </HStack>
                <Text
                  color="primary.500"
                  fontWeight={800}
                  fontSize="24px"
                  lineHeight="100%"
                >
                  {data?.data?.assetName}
                </Text>
                <HStack spacing="16px">
                  <Text width="50px">Location: </Text>
                  <Text>
                    {data?.data?.floorName
                      ? `${data?.data?.floorName ?? ''}/${data?.data?.roomName ?? ''}`
                      : '-'}
                  </Text>
                </HStack>
              </VStack>
              <VStack alignItems="flex-start" spacing="8px" width="full">
                <Text fontSize="16px" fontWeight={800} lineHeight="100%">
                  Policies ({data?.data?.totalPolicies})
                </Text>
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
            </VStack>
          </DrawerBody>
        </>
      )}
    </GenericDrawer>
  );
};

export default AssetComplianceDetailDrawer;

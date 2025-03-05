import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetAllAssetQuery } from '~/lib/redux/services/asset/general.services';
import { Asset } from '~/lib/interfaces/asset/general.interface';

const ComplianceRiskAssessment = () => {
  const { data, isLoading } = useGetAllAssetQuery({ pageSize: 5 });
  const columnHelper = createColumnHelper<Asset>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Compliance Standard',
          enableSorting: false,
        }),
        columnHelper.accessor('assetCategory', {
          cell: () => 'Compliant',
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'DD-MM-YYYY') ?? 'N/A',
          header: 'Last Audit Date',
          enableSorting: false,
        }),
        columnHelper.accessor('lastMaintenanceDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD-MM-YYYY') ?? 'N/A',
          header: 'Expiry Date',
          enableSorting: false,
        }),
        columnHelper.accessor('initialValue', {
          cell: () => 'Low',
          header: 'Risk Level',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <VStack
      width="full"
      height="full"
      pl="16px"
      pr="15px"
      pt="21px"
      pb="12px"
      alignItems="flex-start"
      spacing="16px"
      bgColor="white"
      rounded="8px"
    >
      <HStack width="full" justifyContent="space-between">
        <HStack>
          <CardHeader>Compliance & Risk Assessment</CardHeader>
          <Text
            color="neutral.800"
            py="6px"
            px="8px"
            rounded="4px"
            bgColor="neutral.200"
          >
            This Month
          </Text>
        </HStack>
        <Button
          href={`/${ROUTES.TICKETS}`}
          customStyles={{
            py: 0,
            height: '28px',
            width: '68px',
            fontSize: '12px',
            lineHeight: '14.26px',
          }}
        >
          View All
        </Button>
      </HStack>
      <Flex width="full">
        <DataTable
          columns={columns}
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          showFooter={false}
          customThStyle={{
            paddingLeft: '16px',
            paddingTop: '17px',
            paddingBottom: '17px',
            fontWeight: 700,
          }}
          customTdStyle={{
            paddingLeft: '16px',
            paddingTop: '16px',
            paddingBottom: '16px',
          }}
          customTBodyRowStyle={{ verticalAlign: 'top' }}
          maxTdWidth="250px"
        />
      </Flex>
    </VStack>
  );
};

export default ComplianceRiskAssessment;

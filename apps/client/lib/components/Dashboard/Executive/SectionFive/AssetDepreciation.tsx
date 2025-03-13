import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Button, DataTable } from '@repo/ui/components';
import { DATE_PERIOD, ROUTES } from '~/lib/utils/constants';
import CardHeader from '../../Common/CardHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { amountFormatter } from '~/lib/utils/Formatters';
import { useGetAssetDepreciationFinancialImpactQuery } from '~/lib/redux/services/dashboard/executive.services';
import { FinancialImpact } from '~/lib/interfaces/dashboard/executive.interfaces';

const AssetDepreciation = () => {
  const { data, isLoading } = useGetAssetDepreciationFinancialImpactQuery({
    datePeriod: DATE_PERIOD.YEAR,
  });
  const columnHelper = createColumnHelper<FinancialImpact>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('assetName', {
          cell: (info) => info.getValue(),
          header: 'Asset Name',
          enableSorting: false,
        }),
        columnHelper.accessor('category', {
          cell: (info) => info.getValue(),
          header: 'Category',
          enableSorting: false,
        }),
        columnHelper.accessor('initialCost', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Initial Cost($)',
          enableSorting: false,
        }),
        columnHelper.accessor('currentValue', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Current Value($)',
          enableSorting: false,
        }),
        columnHelper.accessor('depreciationRate', {
          cell: (info) => `${info.getValue()}%`,
          header: 'Depreciation Rate(%)',
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
          <CardHeader>Financial Impact of Asset Depreciation</CardHeader>
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
          href={`/${ROUTES.ASSETS}`}
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
          data={data?.data ?? []}
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

export default AssetDepreciation;

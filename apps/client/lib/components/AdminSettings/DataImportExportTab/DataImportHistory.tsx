import { HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { DataTable, FormInputWrapper } from '@repo/ui/components';
import React, { useMemo } from 'react';
import DetailHeader from '../../UI/DetailHeader';
import { createColumnHelper } from '@tanstack/react-table';
import { AuditRecord } from '~/lib/interfaces/log.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';
import { useGetAllAuditRecordsQuery } from '~/lib/redux/services/log.services';

const ImportStatus = ({ data }: { data: AuditRecord }) => {
  return (
    <HStack>
      <Text color="neutral.700">Failed</Text>
    </HStack>
  );
};

const Action = ({ data }: { data: AuditRecord }) => {
  return (
    <Text color="blue.500" as="button">
      View Errors
    </Text>
  );
};
export const DataImportHistory = () => {
  const columnHelper = createColumnHelper<AuditRecord>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { data, isLoading, isFetching } = useGetAllAuditRecordsQuery({
    pageNumber: 1,
    pageSize: 3,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'YYYY-DD-MM hh:mmA'),
          header: 'Date',
          enableSorting: false,
        }),
        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Uploaded By',
          enableSorting: false,
        }),
        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'File Name',
          enableSorting: false,
        }),
        columnHelper.accessor('userId', {
          cell: (info) => <Action data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('dateCreated', {
          cell: (info) => dateFormatter(info.getValue(), 'DD MMM YYYY, HH:mm'),
          header: 'Date',
          enableSorting: false,
        }),
        columnHelper.accessor('requestActionTypeName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Uploaded By',
          enableSorting: false,
        }),
        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'File Name',
          enableSorting: false,
        }),
        columnHelper.accessor('systemModuleContextTypeId', {
          cell: (info) => <ImportStatus data={info.row.original} />,
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('actionPerformedViaId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Records Imported',
          enableSorting: false,
        }),
        columnHelper.accessor('systemContextTypeId', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Errors',
          enableSorting: false,
        }),
        columnHelper.accessor('userId', {
          cell: (info) => <Action data={info.row.original} />,
          header: 'Action',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [data?.data?.items] //eslint-disable-line
  );

  return (
    <VStack width="full" spacing={{ base: '16px', lg: '32px' }}>
      <DetailHeader
        variant="primary"
        customStyles={{ size: 'lg', mt: { base: '16px', lg: '0px' } }}
      >
        3. Data Import History
      </DetailHeader>{' '}
      <FormInputWrapper
        sectionMaxWidth="157px"
        customSpacing="64px"
        description="Track and review details of all past data imports."
        title="Data Import History"
        isRequired={false}
      >
        <VStack w="full" maxW="878px">
          <DataTable
            columns={isMobile ? mobileColumns : columns}
            data={data?.data?.items ?? []}
            showFooter={false}
            isLoading={isLoading}
            emptyLines={3}
            maxTdWidth="250px"
            customThStyle={{
              paddingLeft: '16px',
              paddingTop: '17px',
              paddingBottom: '17px',
              fontWeight: 700,
              bgColor: '#B4BFCA',
            }}
            customTdStyle={{
              paddingLeft: '16px',
              paddingTop: '16px',
              paddingBottom: '16px',
            }}
            customTBodyRowStyle={{ verticalAlign: 'top' }}
            customTableContainerStyle={{
              rounded: '4px',
            }}
          />
        </VStack>
      </FormInputWrapper>
    </VStack>
  );
};

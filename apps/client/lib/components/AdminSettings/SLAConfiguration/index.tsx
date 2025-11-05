import {
  Heading,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import Action from './Action';
import { DataTable } from '@repo/ui/components';
import { useGetSLADefinitionsQuery } from '~/lib/redux/services/settings/sla.services';
import { SLADefinition } from '~/lib/interfaces/sla.interfaces';
import SLARuleFormModal from './SLARuleFormDrawer';

const SLAConfiguration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const columnHelper = createColumnHelper<SLADefinition>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetSLADefinitionsQuery({
    pageNumber,
    pageSize,
  });

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketTypeName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Type',
          enableSorting: false,
        }),
        columnHelper.accessor('priorityName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Priority Level',
          enableSorting: false,
        }),
        columnHelper.accessor('isActive', {
          cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('slaDefinitionId', {
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
        columnHelper.accessor('ticketTypeName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Ticket Type',
          enableSorting: false,
        }),
        columnHelper.accessor('priorityName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Priority Level',
          enableSorting: false,
        }),
        columnHelper.accessor('slaResponseHours', {
          cell: (info) => (info.getValue() ? `${info.getValue()}hrs` : 'N/A'),
          header: 'SLA Response Time',
          enableSorting: false,
        }),
        columnHelper.accessor('slaReminderHours', {
          cell: (info) => (info.getValue() ? `${info.getValue()}hrs` : 'N/A'),
          header: 'SLA Resolution Time',
          enableSorting: false,
        }),
        columnHelper.accessor('isActive', {
          cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('lastModifiedDate', {
          cell: (info) =>
            `${dateFormatter(info.getValue(), 'MMM DD, YYYY')} by ${info.row.original.lastModifiedBy}`,
          header: 'Last Updated',
          enableSorting: false,
        }),
        columnHelper.accessor('slaDefinitionId', {
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
    <>
      <VStack
        spacing="24px"
        width="full"
        alignItems="flex-start"
        bgColor="white"
        p={{ base: '16px', md: '24px' }}
        pt={{ base: '23px', lg: '35px' }}
        rounded={{ md: '6px' }}
        minH={{ base: '60vh' }}
      >
        <HStack width="full" justifyContent="space-between">
          <Heading color="primary.500" size="md" lineHeight="100%">
            SLA Configuration
          </Heading>
          <Text
            color="blue.500"
            size="md"
            lineHeight="100%"
            fontWeight={700}
            cursor="pointer"
            onClick={onOpen}
          >
            Add SLA Rule
          </Text>
        </HStack>
        <DataTable
          columns={isMobile ? mobileColumns : columns}
          data={data?.data?.items ?? []}
          showFooter={data?.data ? data?.data?.totalPages > 1 : false}
          isLoading={isLoading}
          isFetching={isFetching}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
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
      <SLARuleFormModal isOpen={isOpen} onClose={onClose} type="create" />
    </>
  );
};

export default SLAConfiguration;

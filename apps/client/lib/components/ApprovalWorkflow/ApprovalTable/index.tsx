import { Flex, HStack, Text } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetTicketsByTabScopeQuery } from '~/lib/redux/services/ticket.services';
import { COLOR_CODES_FALLBACK, DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

interface ApprovalTableProps {
  approvalCategory: 'disposal' | 'transfer' | 'all';
}

const ApprovalTable = (props: ApprovalTableProps) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { approvalCategory } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetTicketsByTabScopeQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
    tabScopeName: 'scheduled',
  });

  const columnHelper = createColumnHelper<Ticket>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketId', {
          cell: (info) => info.getValue(),
          header: 'ID',
          enableSorting: false,
        }),

        columnHelper.accessor('ticketTitle', {
          cell: () =>
            approvalCategory === 'disposal'
              ? 'Bulk Asset Disposal'
              : 'Bulk Asset Transfer',
          header: 'Approval Type',
          enableSorting: false,
        }),

        columnHelper.accessor('reportedBy', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'Requestor',
          enableSorting: true,
        }),

        columnHelper.accessor('rowId', {
          cell: (info) => info.getValue(),
          header: 'No of Approval Level',
          enableSorting: false,
        }),

        columnHelper.accessor('issueReportDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Date Requested',
          enableSorting: false,
        }),

        columnHelper.accessor('reportedBy', {
          cell: (info) => {
            return (
              <>
                <HStack>
                  <Text> Level 1</Text> <Text>/</Text>
                  <UserInfo name={info.getValue()} />
                </HStack>
              </>
            );
          },
          header: 'Current Level / Pending With',
          enableSorting: false,
        }),

        columnHelper.accessor('ticketPriorityName', {
          cell: (info) => {
            const ticket = info.row.original;

            return (
              <GenericStatusBox
                colorCode={
                  ticket.priorityColorCode ?? COLOR_CODES_FALLBACK.default
                }
                width="90px"
                text="Incomplete"
              />
            );
          },
          header: 'Status',
        }),

        columnHelper.accessor('facilityRef', {
          cell: () => <PopoverAction />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex width="full" mt="24px">
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        emptyLines={15}
        isSelectable
        maxTdWidth="200px"
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
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default ApprovalTable;

import { Flex, HStack, Text } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';

interface ApprovalTableProps extends GenericTableProps {
  approvalCategory: 'disposal' | 'transfer' | 'all';
  data: Ticket[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: Ticket) => void;
}

const ApprovalTable = (props: ApprovalTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    selectMultipleRows,
    pageNumber,
    pageSize,
    disabledRows,
    showFooter,
    emptyText,
    emptyLines,
    totalPages,
    selectedRows,
    showEmptyState,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
    approvalCategory,
  } = props;

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
    [[data]] //eslint-disable-line
  );

  return (
    <Flex width="full">
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSelectRow={handleSelectRow}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={showFooter}
        emptyText={emptyText}
        emptyLines={emptyLines}
        isSelectable={isSelectable}
        selectMultipleRows={selectMultipleRows}
        disabledRows={disabledRows}
        showEmptyState={showEmptyState}
        maxTdWidth="200px"
        customTdStyle={{
          paddingLeft: '16px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      />
    </Flex>
  );
};

export default ApprovalTable;

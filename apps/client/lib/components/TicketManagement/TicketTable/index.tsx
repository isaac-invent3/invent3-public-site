import { Flex } from '@chakra-ui/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket, TicketCategory } from '~/lib/interfaces/ticket.interfaces';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import TicketOverlays from '../Overlays';
import PopoverAction from './PopoverAction';

interface TicketTableProps {
  category?: TicketCategory;
  data: BaseApiResponse<ListResponse<Ticket>> | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSelectable?: boolean;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  pageSize?: number;
  setPageSize?: Dispatch<SetStateAction<number>>;
  selectedRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  emptyLines?: number;
  shouldHideFooter?: boolean;
  showPopover?: boolean;
}
const TicketTable = (props: TicketTableProps) => {
  const {
    category,
    data,
    isFetching,
    isLoading,
    isSelectable,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    selectedRows,
    setSelectedRows,
    emptyLines,
    shouldHideFooter,
    showPopover = true,
  } = props;
  const columnHelper = createColumnHelper<Ticket>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('ticketId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('ticketTitle', {
          cell: (info) => info.getValue(),
          header: 'Title',
          enableSorting: false,
        }),

        ...(category === 'new'
          ? [
              columnHelper.accessor('issueDescription', {
                cell: (info) => info.getValue(),
                header: 'Description',
                enableSorting: false,
              }),
            ]
          : []),

        columnHelper.accessor('ticketTypeName', {
          cell: (info) => info.getValue(),
          header: 'Type',
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
                width="80px"
                text={ticket.ticketPriorityName}
              />
            );
          },
          header: 'Priority',
        }),

        ...(category === 'scheduled'
          ? [
              columnHelper.accessor('rowId', {
                cell: (info) => info.getValue(),
                header: 'No. Of Tasks',
                enableSorting: false,
              }),
            ]
          : []),

        ...(category === 'in_progress'
          ? [
              columnHelper.accessor('rowId', {
                cell: (info) => info.getValue(),
                header: 'Tasks Progress',
                enableSorting: false,
              }),
            ]
          : []),

        columnHelper.accessor('issueReportDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Requested Date',
          enableSorting: false,
        }),

        ...(category === 'completed'
          ? [
              columnHelper.accessor('resolutionDate', {
                cell: (info) =>
                  dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
                header: 'Resolution Date',
                enableSorting: false,
              }),
            ]
          : []),

        columnHelper.accessor('reportedBy', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'Requested By',
          enableSorting: true,
        }),

        ...(category !== 'new'
          ? [
              columnHelper.accessor('assignedTo', {
                cell: (info) => <UserInfo name={info.getValue()} />,
                header: 'Assigned To',
                enableSorting: false,
              }),
            ]
          : []),
      ];

      const Popover = columnHelper.accessor('facilityRef', {
        cell: (info) => (
          <PopoverAction ticket={info.row.original} category={category} />
        ),
        header: '',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(Popover);
      }

      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <Flex width="full">
      <TicketOverlays />
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
        emptyLines={emptyLines}
        isSelectable={isSelectable}
        showFooter={
          shouldHideFooter && data?.data?.totalPages === 1 ? true : false
        }
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
        rowColorKey="priorityColorCode"
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default TicketTable;

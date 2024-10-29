import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import DataTable from '~/lib/components/UI/Table';
import { TaskPriorityColorCode } from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useGetAllTicketsQuery } from '~/lib/redux/services/ticket.services';
import { Flex } from '@chakra-ui/react';
import UserInfo from '~/lib/components/Common/UserInfo';

interface TicketTableProps {
  type: 'new' | 'scheduled' | 'completed';
}
const TicketTable = (props: TicketTableProps) => {
  const { type } = props;
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTicketsQuery({
    pageNumber: currentPage,
    pageSize: pageSize,
  });

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
        ...(type === 'new'
          ? [
              columnHelper.accessor('issueDescription', {
                cell: (info) => info.getValue(),
                header: 'Description',
                enableSorting: false,
              }),
            ]
          : []),
        columnHelper.accessor('ticketId', {
          cell: () => {
            return (
              <GenericStatusBox
                colorCode={TaskPriorityColorCode['High']}
                text="High"
              />
            );
          },
          header: 'Priority',
        }),
        ...(type !== 'new'
          ? [
              columnHelper.accessor('rowId', {
                cell: (info) => info.getValue(),
                header: 'No. Of Tasks',
                enableSorting: false,
              }),
            ]
          : []),
        columnHelper.accessor('issueReportDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Requested Dat e',
          enableSorting: false,
        }),
        ...(type !== 'new'
          ? [
              columnHelper.accessor('resolutionDate', {
                cell: (info) =>
                  dateFormatter(info.getValue(), 'DD / MM / YYYY'),
                header: 'Resolution Date',
                enableSorting: false,
              }),
              columnHelper.accessor('resolvedBy', {
                cell: (info) => <UserInfo name={info.getValue()} />,
                header: 'Assigned To',
                enableSorting: false,
              }),
            ]
          : []),
        columnHelper.accessor('reportedBy', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'Requested By',
          enableSorting: true,
        }),
        columnHelper.accessor('rowId', {
          cell: (info) => (
            <PopoverAction ticket={info.row.original} type={type} />
          ),
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
        emptyLines={5}
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

export default TicketTable;

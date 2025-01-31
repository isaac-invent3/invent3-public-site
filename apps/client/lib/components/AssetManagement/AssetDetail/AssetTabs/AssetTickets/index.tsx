import { Flex } from '@chakra-ui/react';
import { OPERATORS } from '@repo/constants';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Ticket } from '~/lib/interfaces/ticket.interfaces';
import { useAppSelector } from '~/lib/redux/hooks';
import { useSearchTicketsMutation } from '~/lib/redux/services/ticket.services';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

const AssetTickets = () => {
  const assetData = useAppSelector((state) => state.asset.asset);

  if (!assetData) {
    return null;
  }
  const { assetId } = assetData;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const searchCriterion = {
    criterion: [
      {
        columnName: 'assetId',
        columnValue: assetId,
        operation: OPERATORS.Equals,
      },
    ],
    pageNumber: currentPage,
    pageSize: pageSize,
  };

  const [searchTicketMutation, { isLoading, data }] =
    useSearchTicketsMutation();

  useEffect(() => {
    searchTicketMutation(searchCriterion);
  }, []);

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

        columnHelper.accessor('issueReportDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY hh:mma'),
          header: 'Requested Date',
          enableSorting: false,
        }),

        columnHelper.accessor('reportedBy', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'Requested By',
          enableSorting: true,
        }),

        columnHelper.accessor('facilityRef', {
          cell: (info) => (
            <PopoverAction ticket={info.row.original} category="in_progress" />
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
    <Flex
      width="full"
      alignItems="flex-end"
      gap="16px"
      direction="column"
      my="32px"
    >
      <DataTable
        columns={columns}
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
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
        showFooter={Boolean(
          data?.data?.totalPages && data?.data?.totalPages > 1
        )}
        rowColorKey="priorityColorCode"
        customTableContainerStyle={{ rounded: 'none' }}
      />
    </Flex>
  );
};

export default AssetTickets;

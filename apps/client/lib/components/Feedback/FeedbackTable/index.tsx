import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { Feedback } from '~/lib/interfaces/feedback.interfaces';
import { COLOR_CODES_FALLBACK } from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

interface FeedbackTableProps {
  data: BaseApiResponse<ListResponse<Feedback>> | undefined;
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
const FeedbackTable = (props: FeedbackTableProps) => {
  const {
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
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<Feedback>();

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('feedbackID', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('user', {
          cell: (info) => {
            const feedback = info.row.original;
            return (
              <Text>
                {feedback.user}
                <br />

                <Text as="span" size="xs" color="neutral.600" fontWeight={500}>
                  {feedback.userRoleName}
                </Text>
              </Text>
            );
          },
          header: 'User',
          enableSorting: false,
        }),

        columnHelper.accessor('feedbackType', {
          cell: (info) => info.getValue(),
          header: 'Feedback Type',
          enableSorting: false,
        }),
      ];

      const Popover = columnHelper.accessor('statusID', {
        cell: (info) => <PopoverAction feedback={info.row.original} />,
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

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('feedbackID', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('user', {
          cell: (info) => {
            const feedback = info.row.original;
            return (
              <Text>
                {feedback.user}
                <br />

                <Text as="span" size="xs" color="neutral.600" fontWeight={500}>
                  {feedback.userRoleName}
                </Text>
              </Text>
            );
          },
          header: 'User',
          enableSorting: false,
        }),

        columnHelper.accessor('subject', {
          cell: (info) => info.getValue(),
          header: 'Subject',
          enableSorting: false,
        }),

        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue(),
          header: 'Company',
          enableSorting: false,
        }),

        columnHelper.accessor('email', {
          cell: (info) => info.getValue(),
          header: 'Email',
          enableSorting: false,
        }),

        columnHelper.accessor('feedbackType', {
          cell: (info) => info.getValue(),
          header: 'Feedback Type',
          enableSorting: false,
        }),

        columnHelper.accessor('submittedDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Submitted Date',
          enableSorting: false,
        }),

        columnHelper.accessor('statusName', {
          cell: (info) => {
            const feedback = info.row.original;

            return (
              <GenericStatusBox
                colorCode={COLOR_CODES_FALLBACK.default}
                width="80px"
                text={feedback.statusName}
              />
            );
          },
          header: 'Status',
        }),
      ];

      const Popover = columnHelper.accessor('statusID', {
        cell: (info) => <PopoverAction feedback={info.row.original} />,
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
      <DataTable
        columns={isMobile ? mobileColumns : columns}
        data={data?.data ?? []}
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
      />
    </Flex>
  );
};

export default FeedbackTable;

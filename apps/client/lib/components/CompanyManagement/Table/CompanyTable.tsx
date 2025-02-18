import { Flex, useMediaQuery } from '@chakra-ui/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { Company } from '~/lib/interfaces/company.interfaces';
import {
  COLOR_CODES_FALLBACK,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';

interface CompanyTableProps {
  data: BaseApiResponse<ListResponse<Company>> | undefined;
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
const CompanyTable = (props: CompanyTableProps) => {
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
  const { updateSearchParam } = useCustomSearchParams();
  const columnHelper = createColumnHelper<Company>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('companyId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue(),
          header: 'Company Name',
          enableSorting: false,
        }),

        columnHelper.accessor('industry', {
          cell: (info) => info.getValue(),
          header: 'Industry',
          enableSorting: false,
        }),
        columnHelper.accessor('totalAsset', {
          cell: (info) => info.getValue(),
          header: 'Total Asset',
          enableSorting: false,
        }),
        columnHelper.accessor('primaryContacts', {
          cell: (info) => <UserInfo name={info.getValue()} />,
          header: 'Primary Contact Person',
          enableSorting: true,
        }),
        columnHelper.accessor('email', {
          cell: (info) => info.getValue(),
          header: 'Email',
          enableSorting: false,
        }),
        columnHelper.accessor('subscriptionType', {
          cell: (info) => info.getValue(),
          header: 'Subscription Type',
          enableSorting: false,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) => dateFormatter(info.getValue(), 'DD / MM / YYYY'),
          header: 'Creation Date',
          enableSorting: false,
        }),

        columnHelper.accessor('subscriptionStatus', {
          cell: (info) => {
            const ticket = info.row.original;

            return (
              <GenericStatusBox
                colorCode={COLOR_CODES_FALLBACK.default}
                width="80px"
                text={ticket.subscriptionStatus}
              />
            );
          },
          header: 'Priority',
        }),
      ];

      const Popover = columnHelper.accessor('industry', {
        cell: (info) => <PopoverAction company={info.row.original} />,
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

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('companyId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),

        columnHelper.accessor('companyName', {
          cell: (info) => info.getValue(),
          header: 'Company Name',
          enableSorting: false,
        }),

        columnHelper.accessor('subscriptionStatus', {
          cell: (info) => {
            const ticket = info.row.original;

            return (
              <GenericStatusBox
                colorCode={COLOR_CODES_FALLBACK.default}
                width="80px"
                text={ticket.subscriptionStatus}
              />
            );
          },
          header: 'Priority',
        }),
      ];

      const Popover = columnHelper.accessor('apikey', {
        cell: (info) => <PopoverAction company={info.row.original} />,
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
        handleSelectRow={(row) => {
          updateSearchParam(SYSTEM_CONTEXT_DETAILS.COMPANY.slug, row.companyId);
        }}
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

export default CompanyTable;

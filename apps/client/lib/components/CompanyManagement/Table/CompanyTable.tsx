import { Flex, useMediaQuery } from '@chakra-ui/react';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import UserInfo from '~/lib/components/Common/UserInfo';
import { Company } from '~/lib/interfaces/company.interfaces';

import { dateFormatter } from '~/lib/utils/Formatters';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { useRouter } from 'next/navigation';
import { ROUTES } from '~/lib/utils/constants';

interface CompanyTableProps extends GenericTableProps {
  data: BaseApiResponse<ListResponse<Company>> | undefined;
}
const CompanyTable = (props: CompanyTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    selectedRows,
    setSelectedRows,
    emptyLines,
    showFooter,
    showPopover = true,
  } = props;
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
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
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Company Name',
          enableSorting: false,
        }),

        columnHelper.accessor('industryName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Industry',
          enableSorting: false,
        }),
        columnHelper.accessor('contactPersonFirstName', {
          cell: (info) => (
            <UserInfo
              name={`${info.row.original.contactPersonFirstName ?? ''} ${info.row.original.contactPersonLastName ?? ''}`}
            />
          ),
          header: 'Primary Contact Person',
          enableSorting: true,
        }),
        columnHelper.accessor('emailAddress', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Email',
          enableSorting: false,
        }),
        // columnHelper.accessor('subscriptionPlanId', {
        //   cell: (info) => info.getValue(),
        //   header: 'Subscription Type',
        //   enableSorting: false,
        // }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Creation Date',
          enableSorting: false,
        }),
      ];

      const Popover = columnHelper.accessor('registrationNumber', {
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
        columnHelper.accessor('industryName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Industry',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Creation Date',
          enableSorting: false,
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
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        emptyLines={emptyLines}
        isSelectable={isSelectable}
        handleSelectRow={(row) => {
          router.push(`/${ROUTES.COMPANY}/${row.companyId}/edit`);
        }}
        showFooter={showFooter && data?.data?.totalPages === 1 ? true : false}
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

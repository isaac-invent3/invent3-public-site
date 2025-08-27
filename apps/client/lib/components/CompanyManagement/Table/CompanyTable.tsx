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
import {
  COMPANY_TYPE_ENUM,
  ROLE_IDS_ENUM,
  ROUTES,
} from '~/lib/utils/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GenericStatusBox from '../../UI/GenericStatusBox';

interface CompanyTableProps extends GenericTableProps {
  data: BaseApiResponse<ListResponse<Company>> | undefined;
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: Company) => JSX.Element | undefined;
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
    PopoverComponent,
  } = props;
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<Company>();
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  const isSuperAdmin =
    user?.roleIds.includes(ROLE_IDS_ENUM.SUPER_ADMIN) ?? false;

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
        columnHelper.accessor('contactPersonName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Primary Contact Person',
          enableSorting: false,
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
        columnHelper.accessor('subscriptionStatusName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original?.displayColorCode}
              />
            );
          },
          header: 'Subscription Status',
          enableSorting: false,
        }),
      ];

      const Popover = columnHelper.accessor('registrationNumber', {
        cell: (info) => {
          if (PopoverComponent) {
            return PopoverComponent(info.row.original);
          }
          return <PopoverAction company={info.row.original} />;
        },
        header: '',
        enableSorting: false,
      });

      const clientType = columnHelper.accessor('companyType', {
        cell: (info) =>
          info.getValue()
            ? info.getValue() === COMPANY_TYPE_ENUM.MANAGE_OWN_DATA
              ? 'Direct'
              : 'CMF'
            : 'N/A',
        header: 'Client Type',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(Popover);
      }
      if (isSuperAdmin) {
        baseColumns.splice(3, 0, clientType);
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
          router.push(`/${ROUTES.COMPANY}/${row.companyId}/details`);
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

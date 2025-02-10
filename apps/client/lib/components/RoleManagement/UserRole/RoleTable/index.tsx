import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { User } from '~/lib/interfaces/user.interfaces';
import GenericStatusBox from '../../../UI/GenericStatusBox';
import { Role } from '~/lib/interfaces/role.interfaces';
import { dateFormatter } from '~/lib/utils/Formatters';

interface RoleTableProps extends GenericTableProps {
  data: Role[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: User) => void;
}

const RoleTable = (props: RoleTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    pageNumber,
    pageSize,
    totalPages,
    setPageNumber,
    setPageSize,
  } = props;
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<Role>();

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('roleName', {
          cell: (info) => info.getValue(),
          header: 'Role',
          enableSorting: false,
        }),

        columnHelper.accessor('lastModifiedDate', {
          cell: () => <Text color="blue.500">10</Text>,
          header: 'Accounts',
          enableSorting: false,
        }),
        columnHelper.accessor('roleId', {
          cell: () => {
            return <GenericStatusBox text="Active" colorCode="#07CC3B" />;
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction role={info.row.original} />,
          header: '',
          enableSorting: false,
        }),
      ];

      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('roleName', {
          cell: (info) => info.getValue(),
          header: 'Role',
          enableSorting: false,
        }),

        columnHelper.accessor('lastModifiedDate', {
          cell: () => <Text color="blue.500">10</Text>,
          header: 'Accounts',
          enableSorting: false,
        }),

        columnHelper.accessor('isNew', {
          cell: () => '05',
          header: 'Modules',
          enableSorting: true,
        }),
        columnHelper.accessor('createdDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),
        columnHelper.accessor('roleId', {
          cell: () => {
            return <GenericStatusBox text="Active" colorCode="#07CC3B" />;
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction role={info.row.original} />,
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
        columns={isMobile ? mobileColumns : columns}
        data={data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        emptyLines={10}
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

export default RoleTable;

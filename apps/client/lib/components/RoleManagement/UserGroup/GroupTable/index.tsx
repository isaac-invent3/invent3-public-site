import { Avatar, AvatarGroup, Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { User, UserGroupInfoHeader } from '~/lib/interfaces/user.interfaces';
import GenericStatusBox from '../../../UI/GenericStatusBox';
import { dateFormatter } from '~/lib/utils/Formatters';

interface UserGroupTableProps extends GenericTableProps {
  data: UserGroupInfoHeader[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: User) => void;
}

const UserGroupTable = (props: UserGroupTableProps) => {
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

  const columnHelper = createColumnHelper<UserGroupInfoHeader>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('groupName', {
          cell: (info) => info.getValue(),
          header: 'User Group',
          enableSorting: false,
        }),
        columnHelper.accessor('groupId', {
          cell: () => 'John Doe',
          header: 'Owner',
          enableSorting: true,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.row.original.statusName}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('owner', {
          cell: (info) => <PopoverAction group={info.row.original} />,
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
        columnHelper.accessor('groupName', {
          cell: (info) => info.getValue(),
          header: 'User Group',
          enableSorting: false,
        }),

        columnHelper.accessor('noOfAssociatedUsers', {
          cell: (info) => {
            return (
              <AvatarGroup size="sm" max={4}>
                {Array(info.getValue())
                  .fill('')
                  .map((item, index) => (
                    <Avatar name="" src="" key={index} />
                  ))}
              </AvatarGroup>
            );
          },
          header: 'Users',
          enableSorting: false,
        }),

        columnHelper.accessor('owner', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Owner',
          enableSorting: true,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),
        columnHelper.accessor('statusId', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.row.original.statusName}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction group={info.row.original} />,
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

export default UserGroupTable;

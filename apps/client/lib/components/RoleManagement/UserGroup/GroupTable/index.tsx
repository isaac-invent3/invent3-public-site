import { Avatar, AvatarGroup, Flex, useMediaQuery } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { User, UserGroup } from '~/lib/interfaces/user.interfaces';
import GenericStatusBox from '../../../UI/GenericStatusBox';
import { dateFormatter } from '~/lib/utils/Formatters';

interface UserGroupTableProps extends GenericTableProps {
  data: UserGroup[];
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

  const columnHelper = createColumnHelper<UserGroup>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('groupName', {
          cell: (info) => info.getValue(),
          header: 'User Group',
          enableSorting: false,
        }),
        columnHelper.accessor('userGroupId', {
          cell: () => 'John Doe',
          header: 'Owner',
          enableSorting: true,
        }),
        columnHelper.accessor('groupId', {
          cell: () => {
            return <GenericStatusBox text="Active" colorCode="#07CC3B" />;
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('userId', {
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

        columnHelper.accessor('groupId', {
          cell: () => {
            return (
              <AvatarGroup size="sm" max={4}>
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
            );
          },
          header: 'Users',
          enableSorting: false,
        }),

        columnHelper.accessor('userGroupId', {
          cell: () => 'John Doe',
          header: 'Owner',
          enableSorting: true,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),
        columnHelper.accessor('groupId', {
          cell: () => {
            return <GenericStatusBox text="Active" colorCode="#07CC3B" />;
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('userId', {
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

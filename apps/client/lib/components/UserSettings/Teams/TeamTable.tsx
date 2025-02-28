import { DataTable } from '@repo/ui/components';
import React, { useMemo, useState } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import GenericStatusBox from '../../UI/GenericStatusBox';
import UserInfo from '../../Common/UserInfo';
import { Text, useMediaQuery } from '@chakra-ui/react';
import { UserGroupMember } from '~/lib/interfaces/user.interfaces';
import { useGetUserGroupMembersQuery } from '~/lib/redux/services/user.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';

interface TeamTableProps {
  groupId: number;
}
const TeamTable = ({ groupId }: TeamTableProps) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const session = useSession();
  const { data, isLoading, isFetching } = useGetUserGroupMembersQuery(
    { groupId, userId: session?.data?.user?.userId! },
    { skip: !session?.data?.user?.userId }
  );
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<UserGroupMember>();

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('firstName', {
          cell: (info) => (
            <UserInfo name={`${info.getValue()} ${info.row.original.lastName}`}>
              <Text color="neutral.700" fontWeight={400}>
                {info.row.original.email}
              </Text>
            </UserInfo>
          ),
          header: 'Name',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeStatus', {
          cell: () => {
            return <GenericStatusBox text="Not Active" />;
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeStatusId', {
          cell: () => {
            return 'Frontend Developer';
          },
          header: 'Role',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('firstName', {
          cell: (info) => (
            <UserInfo name={`${info.getValue()} ${info.row.original.lastName}`}>
              <Text color="neutral.700" fontWeight={400}>
                {info.row.original.email}
              </Text>
            </UserInfo>
          ),
          header: 'Name',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeStatus', {
          cell: () => {
            return <GenericStatusBox text="Not Active" />;
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeStatusId', {
          cell: () => {
            return 'Frontend Developer';
          },
          header: 'Role',
          enableSorting: false,
        }),
        columnHelper.accessor('dateAdded', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Added',
          enableSorting: false,
        }),
        columnHelper.accessor('lastActive', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Last Active',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );
  return (
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
      showFooter={data?.data && data?.data?.totalPages > 1}
      emptyText="No team members"
      emptyLines={5}
      isSelectable={false}
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
  );
};

export default TeamTable;

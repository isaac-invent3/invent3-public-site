import { DataTable } from '@repo/ui/components';
import React, { useMemo, useState } from 'react';
import { dateFormatter } from '~/lib/utils/Formatters';
import GenericStatusBox from '../../UI/GenericStatusBox';
import UserInfo from '../../Common/UserInfo';
import { Text, useMediaQuery } from '@chakra-ui/react';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { useGetAllUserTeamMembersQuery } from '~/lib/redux/services/team.services';
import { TeamMember } from '~/lib/interfaces/team.interfaces';

interface TeamTableProps {
  teamId: number;
}
const TeamTable = ({ teamId }: TeamTableProps) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const session = useSession();
  const { data, isLoading, isFetching } = useGetAllUserTeamMembersQuery(
    { teamId },
    { skip: !session?.data?.user?.userId }
  );
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const columnHelper = createColumnHelper<TeamMember>();

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('firstName', {
          cell: (info) => (
            <UserInfo name={`${info.getValue()} ${info.row.original.lastName}`}>
              <Text color="neutral.700" fontWeight={400}>
                {info.row.original.username}
              </Text>
            </UserInfo>
          ),
          header: 'Name',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('designationName', {
          cell: (info) => {
            return info.getValue();
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
                {info.row.original.username}
              </Text>
            </UserInfo>
          ),
          header: 'Name',
          enableSorting: false,
        }),
        columnHelper.accessor('statusName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                text={info.getValue()}
                colorCode={info.row.original.displayColorCode}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('designationName', {
          cell: (info) => {
            return info.getValue();
          },
          header: 'Role',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
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

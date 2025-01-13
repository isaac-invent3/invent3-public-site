import React, { useMemo, useState } from 'react';
import SectionWrapper from '../Common/SectionWrapper';
import { Text } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { Employee } from '~/lib/interfaces/user.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';
import { useGetAllEmployeesQuery } from '~/lib/redux/services/employees.services';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import UserInfo from '../../Common/UserInfo';
import { dateFormatter } from '~/lib/utils/Formatters';

const TeamMembers = () => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isFetching } = useGetAllEmployeesQuery({});
  const columnHelper = createColumnHelper<Employee>();

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('employeeName', {
          cell: (info) => (
            <UserInfo name={info.getValue()}>
              <Text color="neutral.700" fontWeight={400}>
                {info.row.original.emailAddress}
              </Text>
            </UserInfo>
          ),
          header: 'Name',
          enableSorting: false,
        }),
        columnHelper.accessor('employeeName', {
          cell: () => {
            return <GenericStatusBox text="Not Active" />;
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('roleId', {
          cell: () => {
            return 'Frontend Developer';
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('createdBy', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Added',
          enableSorting: false,
        }),
        columnHelper.accessor('createdBy', {
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
    <SectionWrapper
      title="Team Members"
      subtitle="See the list of members in your team."
      sectionInfoWidth="221px"
      spacing="177px"
    >
      <DataTable
        columns={columns}
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
    </SectionWrapper>
  );
};

export default TeamMembers;

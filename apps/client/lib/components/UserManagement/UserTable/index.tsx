import { Flex, Text, VStack } from '@chakra-ui/react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import PopoverAction from './PopoverAction';
import { GenericTableProps } from '~/lib/interfaces/general.interfaces';
import { User } from '~/lib/interfaces/user.interfaces';
import GenericStatusBox from '../../UI/GenericStatusBox';
import UserInfo from '../../Common/UserInfo';

interface UserTableProps extends GenericTableProps {
  data: User[];
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: User) => void;
}

const UserTable = (props: UserTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    selectMultipleRows,
    pageNumber,
    pageSize,
    disabledRows,
    showFooter,
    emptyText,
    emptyLines,
    totalPages,
    selectedRows,
    showEmptyState,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
  } = props;

  const columnHelper = createColumnHelper<User>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('userId', {
          cell: (info) => info.getValue(),
          header: 'User ID',
          enableSorting: false,
        }),

        columnHelper.accessor('lastName', {
          cell: (info) => info.row.original.userId,
          header: 'Employee ID',
          enableSorting: false,
        }),

        columnHelper.accessor('residentialAddress', {
          cell: (info) => (
            <UserInfo
              name={`${info.row.original.firstName} ${info.row.original.lastName}`}
              role="Admin Officer"
            />
          ),
          header: 'User',
          enableSorting: true,
        }),

        columnHelper.accessor('email', {
          cell: (info) => info.getValue(),
          header: 'Email',
          enableSorting: true,
        }),

        columnHelper.accessor('rowId', {
          cell: () => (
            <Text
              color="black"
              py="8px"
              px="16px"
              bgColor="#EABC3040"
              rounded="16px"
            >
              FrontDesk/CSA
            </Text>
          ),
          header: 'User Role',
          enableSorting: true,
        }),

        columnHelper.accessor('stateName', {
          cell: () => (
            <VStack spacing="4px" alignItems="flex-start">
              <Text color="black">Admiralty Way,</Text>
              <Text color="neutral.700" fontSize="10px" lineHeight="11.88px">
                Lekki Epe
              </Text>
            </VStack>
          ),
          header: 'User',
          enableSorting: true,
        }),

        columnHelper.accessor('firstName', {
          cell: () => '23 / 10 / 2024',
          header: 'Hired Date',
          enableSorting: false,
        }),
        columnHelper.accessor('stateName', {
          cell: () => {
            return <GenericStatusBox text="Active" colorCode="#07CC3B" />;
          },
          header: 'Status',
          enableSorting: false,
        }),

        columnHelper.accessor('guid', {
          cell: (info) => <PopoverAction user={info.row.original} />,
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
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSelectRow={handleSelectRow}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showFooter={showFooter}
        emptyText={emptyText}
        emptyLines={emptyLines}
        isSelectable={isSelectable}
        selectMultipleRows={selectMultipleRows}
        disabledRows={disabledRows}
        showEmptyState={showEmptyState}
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

export default UserTable;

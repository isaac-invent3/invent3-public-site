import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  HStack,
  Text,
  Skeleton,
  TableContainer,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import CheckBox from '../CheckBox';
import { ChevronDownIcon, ChevronUpIcon } from '../../CustomIcons';
import Pagination from './Pagination';

export type TableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
  handleSelectRow?: React.Dispatch<React.SetStateAction<any>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
};

function DataTable<Data extends object>({
  data,
  columns,
  isLoading = false,
  isFetching,
  emptyText = 'No data',
  showFooter = true,
  emptyLines = 5,
  pageNumber = 1,
  totalPages = 1,
  pageSize = 1,
  setPageSize,
  selectedRows,
  setSelectedRows,
  handleSelectRow,
  setPageNumber,
}: TableProps<Data>) {
  const [selectAll, setSelectAll] = useState(false);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(!selectAll ? data.map((_, index) => index) : []);
  };

  const handleSelectRowCheckbox = (index: number) => {
    const updatedSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];

    setSelectedRows(updatedSelectedRows);
  };

  return (
    <Flex direction="column" width="full">
      <TableContainer overflow="auto" bgColor="white" rounded="4px">
        <Table>
          <Thead bgColor="#B4BFCA80">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {/* Checkbox for selecting all rows */}
                <Th key="selectAll" px="16px">
                  <CheckBox
                    isChecked={selectAll}
                    handleChange={handleSelectAll}
                  />
                </Th>
                {headerGroup.headers.map((header) => {
                  const { meta } = header.column.columnDef;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      textTransform="capitalize"
                      fontSize="14px"
                      lineHeight="14.26px"
                      fontWeight={500}
                      color="primary"
                      pl="10px"
                      pr="16px"
                      py="16px"
                    >
                      <Flex
                        align="center"
                        justifyContent={
                          meta?.centerHeader ? 'center' : 'flex-start'
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {/* Sort chevrons */}
                        {header.column.getCanSort() && (
                          <VStack ml="8px" spacing={0}>
                            <Icon
                              as={ChevronUpIcon}
                              boxSize="8px"
                              color="black"
                            />
                            <Icon
                              as={ChevronDownIcon}
                              boxSize="8px"
                              color="black"
                            />
                          </VStack>
                        )}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody bgColor="white" opacity={!isLoading && isFetching ? 0.5 : 1}>
            {isLoading
              ? table.getHeaderGroups().map((headerGroup) =>
                  Array(emptyLines)
                    .fill('')
                    .map((_, index) => (
                      <Tr key={index}>
                        <Td
                          key="loading-checkbox"
                          borderColor="neutral.300"
                          py="16px"
                          px="16px"
                        >
                          <Skeleton height="15px" width="50%" maxW="100px" />
                        </Td>
                        {headerGroup.headers.map((header, headerIndex) => {
                          const { meta } = header.column.columnDef;
                          return (
                            <Td
                              key={headerIndex}
                              isNumeric={meta?.isNumeric}
                              borderColor="neutral.300"
                              py="16px"
                              px="16px"
                            >
                              <Skeleton
                                height="15px"
                                width="50%"
                                maxW="100px"
                              />
                            </Td>
                          );
                        })}
                      </Tr>
                    ))
                )
              : table.getRowModel().rows.map((row, rowIndex) => (
                  <Tr
                    key={row.id}
                    cursor="pointer"
                    onClick={() =>
                      handleSelectRow && handleSelectRow(row.original)
                    }
                    _hover={{
                      bgColor: 'neutral.200',
                    }}
                  >
                    {/* Checkbox for selecting individual row */}
                    <Td
                      key={`checkbox-${row.id}`}
                      borderColor="neutral.300"
                      py="8px"
                      px="16px"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CheckBox
                        isChecked={selectedRows.includes(rowIndex)}
                        handleChange={() => handleSelectRowCheckbox(rowIndex)}
                      />
                    </Td>
                    {row.getVisibleCells().map((cell) => {
                      const { meta } = cell.column.columnDef;
                      return (
                        <Td
                          key={cell.id}
                          isNumeric={meta?.isNumeric}
                          borderColor="neutral.300"
                          color="black"
                          fontSize="12px"
                          fontWeight={500}
                          lineHeight="14.26px"
                          py="8px"
                          pl="10px"
                          pr="16px"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Empty state */}
      {!isLoading && data.length < 1 && (
        <HStack justifyContent="center" my="77px">
          <Text color="neutral.600" size="md">
            {emptyText}
          </Text>
        </HStack>
      )}

      {/* Footer */}
      {showFooter && data && data.length >= 1 && (
        <Flex width="full" mt="8px" justifyContent="flex-end">
          <Pagination
            totalPage={totalPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default DataTable;

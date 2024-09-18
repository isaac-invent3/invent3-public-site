/* eslint-disable no-unused-vars */
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
} from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import Pagination from '../../UI/Table/Pagination';

export type TableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  totalPages?: number;
  pageSize?: number;
  handleSelectRow?: React.Dispatch<React.SetStateAction<any>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
};

export function DetailTable<Data extends object>({
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
  handleSelectRow,
  setPageNumber,
  setPageSize,
}: TableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Flex direction="column" width="full">
      <TableContainer
        overflow="auto"
        opacity={!isLoading && isFetching ? 0.5 : 1}
      >
        <Table>
          <Thead bgColor="#B4BFCA80">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { meta } = header.column.columnDef;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      textTransform="capitalize"
                      fontSize="12px"
                      lineHeight="14.26px"
                      fontWeight={500}
                      color="black"
                      px="16px"
                      py="8px"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody bgColor="white" alignItems="flex-start">
            {isLoading
              ? table.getHeaderGroups().map((headerGroup) =>
                  Array(emptyLines)
                    .fill('')
                    .map((_, index) => (
                      <Tr key={index}>
                        {headerGroup.headers.map((header, headerIndex) => {
                          const { meta } = header.column.columnDef;
                          return (
                            <Td
                              key={headerIndex}
                              isNumeric={meta?.isNumeric}
                              borderColor="#BBBBBB"
                              py="16px"
                              px="16px"
                              alignItems="flex-start"
                            >
                              <Flex
                                justifyContent={
                                  meta?.isNumeric ? 'flex-end' : 'initial'
                                }
                              >
                                <Skeleton
                                  height="15px"
                                  width="50%"
                                  maxW="100px"
                                />
                              </Flex>
                            </Td>
                          );
                        })}
                      </Tr>
                    ))
                )
              : table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    cursor="pointer"
                    verticalAlign="top"
                    onClick={() =>
                      handleSelectRow && handleSelectRow(row.original)
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { meta } = cell.column.columnDef;
                      return (
                        <Td
                          key={cell.id}
                          isNumeric={meta?.isNumeric}
                          borderColor="#BBBBBB"
                          color="black"
                          fontSize="12px"
                          lineHeight="14.26px"
                          fontWeight={500}
                          pt="16px"
                          pb="8px"
                          px="16px"
                          whiteSpace="nowrap"
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

      {/* Empty state  starts */}
      {!isLoading && data.length < 1 && (
        <HStack justifyContent="center" my="77px">
          <Text
            color="neutral.too"
            fontSize="12px"
            lineHeight="14.26px"
            fontWeight={500}
          >
            {emptyText}
          </Text>
        </HStack>
      )}
      {/* Empty state ends */}
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

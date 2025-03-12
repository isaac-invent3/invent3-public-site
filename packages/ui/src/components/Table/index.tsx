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
  Text as ChakraText,
  Skeleton,
  TableContainer,
  VStack,
  Icon,
  StackProps,
  TableColumnHeaderProps,
  TableCellProps,
  TableRowProps,
  TableContainerProps,
} from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../CustomIcons';
import Pagination from './Pagination';
import OverflowTd from './OverflowTd';
import CheckBox from '../CheckBox';

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
  selectedRows?: number[];
  disabledRows?: number[];
  setSelectedRows?: (items: number[]) => void;
  handleSelectRow?: (row: Data) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  maxTdWidth?: string;
  customThStyle?: TableColumnHeaderProps;
  customTdStyle?: TableCellProps;
  customTBodyRowStyle?: TableRowProps;
  customTableContainerStyle?: TableContainerProps;
  paginationStyle?: StackProps;
  hideSelectAllCheckBox?: boolean;
  selectMultipleRows?: boolean;
  showEmptyState?: boolean;
  // Refactor this
  rowColorKey?: keyof Data;
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
  disabledRows = [],
  maxTdWidth,
  setSelectedRows,
  handleSelectRow,
  setPageNumber,
  isSelectable,
  customTdStyle,
  customThStyle,
  customTBodyRowStyle,
  customTableContainerStyle,
  paginationStyle,
  hideSelectAllCheckBox = false,
  selectMultipleRows = true,
  showEmptyState = true,
  rowColorKey,
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
    if (setSelectedRows) {
      setSelectedRows(
        !selectAll
          ? data
              .map((_, index) => index)
              .filter((index) => !disabledRows?.includes(index))
          : []
      );
    }
  };

  const handleSelectRowCheckbox = (index: number) => {
    if (selectedRows && setSelectedRows) {
      // Should only run if select multiple row is true or no row has been selected or the clicked checkbox index is part of the selected row array
      if (!selectMultipleRows) {
        const isAlreadyIncluded = selectedRows.includes(index);
        if (isAlreadyIncluded) {
          setSelectedRows([]);
        } else [setSelectedRows([index])];
      } else {
        const updatedSelectedRows = selectedRows.includes(index)
          ? selectedRows.filter((i) => i !== index)
          : [...selectedRows, index];

        setSelectedRows(updatedSelectedRows);
      }
    }
  };

  return (
    <Flex direction="column" width="full" overflow="auto">
      <TableContainer
        overflowY="auto"
        bgColor="white"
        rounded="none"
        sx={{
          '::-webkit-scrollbar': {
            width: '12px', // Adjust width as needed
            visibility: 'visible',
          },
          '::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.3)', // Custom scrollbar color
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          scrollbarWidth: 'auto', // For Firefox
          scrollbarColor: 'rgba(0, 0, 0, 0.3) #f1f1f1', // For Firefox
        }}
        {...customTableContainerStyle}
      >
        <Table>
          <Thead bgColor="#B4BFCA80">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {/* Checkbox for selecting all rows */}
                {isSelectable && (
                  <Th
                    key="selectAll"
                    px="16px"
                    py="12px"
                    fontWeight={700}
                    {...customThStyle}
                  >
                    <CheckBox
                      isChecked={selectAll}
                      handleChange={handleSelectAll}
                      customStyle={{
                        visibility: hideSelectAllCheckBox
                          ? 'hidden'
                          : 'visible',
                      }}
                    />
                  </Th>
                )}
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
                      fontWeight={700}
                      color="black"
                      px="16px"
                      py="12px"
                      {...customThStyle}
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
          <Tbody opacity={!isLoading && isFetching ? 0.5 : 1} overflow="auto">
            {isLoading
              ? table.getHeaderGroups().map((headerGroup) =>
                  Array(emptyLines)
                    .fill('')
                    .map((_, index) => (
                      <Tr key={index}>
                        {isSelectable && (
                          <Td
                            key="loading-checkbox"
                            borderColor="neutral.300"
                            py="16px"
                            px="16px"
                          >
                            <Skeleton height="15px" width="50%" maxW="100px" />
                          </Td>
                        )}
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
              : table.getRowModel().rows.map((row, rowIndex) => {
                  const isDisabledRow = disabledRows
                    ? disabledRows?.includes(rowIndex)
                    : false;

                  const rowColor =
                    (rowColorKey && `${row.original[rowColorKey]}0D`) ??
                    undefined;
                  return (
                    <Tr
                      key={row.id}
                      bgColor={rowColor}
                      cursor="pointer"
                      onClick={() =>
                        handleSelectRow && handleSelectRow(row.original)
                      }
                      _hover={{
                        bgColor: 'neutral.200',
                      }}
                      {...customTBodyRowStyle}
                    >
                      {/* Checkbox for selecting individual row */}
                      {isSelectable && (
                        <Td
                          key={`checkbox-${row.id}`}
                          borderColor="neutral.300"
                          py="8px"
                          px="16px"
                          onClick={(e) => e.stopPropagation()}
                          {...customTdStyle}
                        >
                          <CheckBox
                            isChecked={
                              selectedRows
                                ? selectedRows.includes(rowIndex)
                                : false
                            }
                            handleChange={() =>
                              !isDisabledRow &&
                              handleSelectRowCheckbox(rowIndex)
                            }
                            customStyle={{
                              borderColor: isDisabledRow
                                ? 'neutral.300'
                                : 'neutral.800',
                              cursor: isDisabledRow ? 'not-allowed' : 'pointer',
                            }}
                          />
                        </Td>
                      )}
                      {row.getVisibleCells().map((cell) => {
                        const { meta } = cell.column.columnDef;
                        if (maxTdWidth) {
                          return (
                            <OverflowTd
                              isNumeric={meta?.isNumeric ?? false}
                              key={cell.id}
                              maxW={maxTdWidth}
                              customTdStyle={customTdStyle}
                              isDisabledRow={isDisabledRow}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </OverflowTd>
                          );
                        } else {
                          return (
                            <Td
                              key={cell.id}
                              borderColor="neutral.300"
                              color={isDisabledRow ? 'neutral.300' : 'black'}
                              cursor={isDisabledRow ? 'not-allowed' : 'pointer'}
                              fontSize="12px"
                              fontWeight={500}
                              lineHeight="14.26px"
                              py="23px"
                              px="16px"
                              textAlign={meta?.isNumeric ? 'center' : 'left'}
                              {...customTdStyle}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          );
                        }
                      })}
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Empty state */}
      {!isLoading && data.length < 1 && showEmptyState && (
        <HStack justifyContent="center" my="77px">
          <ChakraText color="neutral.600" size="md">
            {emptyText}
          </ChakraText>
        </HStack>
      )}

      {/* Footer */}
      {showFooter && data && data.length >= 1 && (
        <Flex
          width="full"
          mt="8px"
          px={{ base: '16px', md: 0 }}
          justifyContent={{ base: 'center', md: 'flex-end' }}
        >
          <Pagination
            totalPage={totalPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            customStyles={paginationStyle}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default DataTable;

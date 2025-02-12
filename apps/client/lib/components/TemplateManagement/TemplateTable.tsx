import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { Template } from '~/lib/interfaces/template.interfaces';
import { useMediaQuery } from '@chakra-ui/react';

interface TemplateTableProps {
  isLoading: boolean;
  isFetching: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows?: number[];
  data: Template[];
  isSelectable?: boolean;
  selectMultipleRows?: boolean;
  showPopover?: boolean;
  disabledRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: Template) => JSX.Element;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTemplate?: React.Dispatch<React.SetStateAction<Template | null>>;
  type: 'modal' | 'page';
}

const TemplateTable = (props: TemplateTableProps) => {
  const {
    isLoading,
    isFetching,
    emptyLines,
    showFooter,
    selectedRows,
    setSelectedRows,
    type,
    showPopover,
    isSelectable,
    selectMultipleRows,
    emptyText,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    totalPages,
    data,
    setSelectedTemplate,
    PopoverComponent,
  } = props;

  const columnHelper = createColumnHelper<Template>();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const mobileColumns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('templateId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('templateName', {
          cell: (info) => info.getValue(),
          header: 'Template Name',
          enableSorting: false,
        }),
        columnHelper.accessor('systemContextTypeDisplayName', {
          cell: (info) => info.getValue(),
          header: 'Context Type',
          enableSorting: false,
        }),
      ];

      const popOverColumn = columnHelper.accessor('guid', {
        cell: (info) => {
          if (PopoverComponent) {
            return PopoverComponent(info.row.original);
          }
        },
        header: '',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(popOverColumn);
      }
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('templateId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('templateName', {
          cell: (info) => info.getValue(),
          header: 'Template Name',
          enableSorting: false,
        }),
        columnHelper.accessor('description', {
          cell: (info) => info.getValue(),
          header: 'Template Description',
          enableSorting: false,
        }),
        columnHelper.accessor('createdBy', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Created By',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Date Created',
          enableSorting: false,
        }),
      ];

      const pageColumns = [
        columnHelper.accessor('systemContextTypeDisplayName', {
          cell: (info) => info.getValue(),
          header: 'Context Type',
          enableSorting: false,
        }),
        columnHelper.accessor('contextId', {
          cell: (info) => info.getValue(),
          header: 'Context ID',
          enableSorting: false,
        }),
      ];

      const popOverColumn = columnHelper.accessor('guid', {
        cell: (info) => {
          if (PopoverComponent) {
            return PopoverComponent(info.row.original);
          }
        },
        header: '',
        enableSorting: false,
      });

      if (showPopover) {
        baseColumns.push(popOverColumn);
      }
      if (type === 'page') {
        baseColumns.splice(3, 0, ...pageColumns);
      }
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
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
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      showFooter={showFooter}
      emptyText={emptyText}
      emptyLines={emptyLines}
      isSelectable={isSelectable}
      selectMultipleRows={selectMultipleRows}
      handleSelectRow={(value) =>
        setSelectedTemplate && setSelectedTemplate(value)
      }
      customThStyle={{
        paddingLeft: '16px',
        paddingTop: '17px',
        paddingBottom: '17px',
        fontWeight: 700,
      }}
      customTdStyle={{
        paddingLeft: '16px',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
      customTBodyRowStyle={{ verticalAlign: 'top' }}
      maxTdWidth="250px"
    />
  );
};

export default TemplateTable;

import React, { useMemo } from 'react';
import { DataTable } from '@repo/ui/components';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatter } from '~/lib/utils/Formatters';
import { MaintenancePlan } from '~/lib/interfaces/maintenance.interfaces';

interface MaintenancePlanProps {
  data: MaintenancePlan[];
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
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  // eslint-disable-next-line no-unused-vars
  handleSelectRow?: (row: MaintenancePlan) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  selectMultipleRows?: boolean;
  showPopover?: boolean;
  showEmptyState?: boolean;
  // eslint-disable-next-line no-unused-vars
  PopoverComponent?: (data: MaintenancePlan) => JSX.Element;
}
const MaintenancePlanTable = (props: MaintenancePlanProps) => {
  const columnHelper = createColumnHelper<MaintenancePlan>();
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
    showPopover = true,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
    PopoverComponent,
  } = props;

  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('maintenancePlanId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('planName', {
          cell: (info) => info.getValue(),
          header: 'Plan Name',
          enableSorting: false,
        }),
        columnHelper.accessor('planTypeName', {
          cell: (info) => info.getValue(),
          header: 'Plan Type',
          enableSorting: false,
        }),
        columnHelper.accessor('assetName', {
          cell: (info) =>
            info.getValue() ?? info.row.original.groupTypeName ?? 'N/A',
          header: 'Plan Scope',
          enableSorting: false,
        }),
        columnHelper.accessor('totalMemberAssetsCount', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'No. Of Assets.',
          enableSorting: false,
          meta: {
            isNumeric: true,
          },
        }),
        columnHelper.accessor('activeSchedules', {
          cell: (info) => info.getValue(),
          header: 'Active Schedules',
          enableSorting: false,
          meta: {
            isNumeric: true,
          },
        }),
        columnHelper.accessor('startDate', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'Start Date',
          enableSorting: false,
        }),
        columnHelper.accessor('endDate', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'End Date',
          enableSorting: false,
        }),
        columnHelper.accessor('planStatusName', {
          cell: (info) => info.getValue() ?? 'N/A',
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCreated', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'Created Date',
          enableSorting: false,
        }),
      ];
      const popOverColumn = columnHelper.accessor('rowId', {
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
    [data] //eslint-disable-line
  );
  return (
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
      customTableContainerStyle={{ rounded: 'none' }}
    />
  );
};

export default MaintenancePlanTable;

import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import DataTable from '~/lib/components/UI/Table';
import { Task } from '~/lib/interfaces/task.interfaces';
import {
  MaintenanceColorCode,
  TaskPriorityColorCode,
} from '~/lib/utils/ColorCodes';
import { dateFormatter } from '~/lib/utils/Formatters';
import AssignedTo from '~/lib/components/Common/AssignedTo';
import PopoverAction from './PopoverAction';

interface TaskTableProps {
  data: Task[];
  isLoading?: boolean;
  isFetching?: boolean;
  emptyText?: string;
  showFooter?: boolean;
  emptyLines?: number;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  selectedRows?: number[];
  setSelectedRows?: React.Dispatch<React.SetStateAction<number[]>>;
  handleSelectRow?: React.Dispatch<React.SetStateAction<any>>;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isSelectable?: boolean;
  isSortable?: boolean;
  type: 'modal' | 'page';
  // eslint-disable-next-line no-unused-vars
}
const TaskTable = (props: TaskTableProps) => {
  const {
    data,
    isFetching,
    isLoading,
    isSelectable,
    pageNumber,
    pageSize,
    showFooter,
    emptyText,
    emptyLines,
    totalPages,
    selectedRows,
    isSortable = true,
    handleSelectRow,
    setPageNumber,
    setPageSize,
    setSelectedRows,
    type,
  } = props;

  const columnHelper = createColumnHelper<Task>();
  const columns = useMemo(
    () => {
      const baseColumns = [
        columnHelper.accessor('taskId', {
          cell: (info) => info.getValue(),
          header: '#',
          enableSorting: false,
        }),
        columnHelper.accessor('taskName', {
          cell: (info) => info.getValue(),
          header: 'Task',
          enableSorting: false,
        }),
        columnHelper.accessor('taskDescription', {
          cell: (info) => info.getValue(),
          header: 'Description',
          enableSorting: false,
        }),
        columnHelper.accessor('scheduleId', {
          cell: (info) => info.getValue(),
          header: 'Schedule ID',
          enableSorting: false,
        }),
        columnHelper.accessor('priorityName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                colorCode={TaskPriorityColorCode[info.getValue() as 'High']}
                text={info.getValue() as string}
              />
            );
          },
          header: 'Priority',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('dueDate', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Due Date',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('dateCompleted', {
          cell: (info) =>
            dateFormatter(info.getValue(), 'DD / MM / YYYY') ?? 'N/A',
          header: 'Completion Date',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('assignedToEmployeeName', {
          cell: (info) => AssignedTo(info.getValue()),
          header: 'Assigned To',
          enableSorting: isSortable,
        }),
        columnHelper.accessor('status', {
          cell: (info) => {
            return (
              <GenericStatusBox
                colorCode={
                  MaintenanceColorCode[info.getValue() as 'Not Started']
                }
                text={info.getValue() as string}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),
        columnHelper.accessor('taskType', {
          cell: (info) => PopoverAction(info.row.original, type),
          header: '',
          enableSorting: isSortable,
        }),
      ];
      return baseColumns;
    },
    [[data]] //eslint-disable-line
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
      customTableContainerStyle={{ rounded: 'none' }}
    />
  );
};

export default TaskTable;

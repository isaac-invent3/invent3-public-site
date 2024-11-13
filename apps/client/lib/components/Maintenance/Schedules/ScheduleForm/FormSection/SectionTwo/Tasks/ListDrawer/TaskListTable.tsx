import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import PopoverAction from './PopoverAction';
import DataTable from '~/lib/components/UI/Table';
import AssignedTo from '~/lib/components/Common/UserInfo';
import { amountFormatter } from '~/lib/utils/Formatters';

interface TaskListTableProps {
  data: taskFormDetails[];
  displayType: 'form' | 'summary';
  type: 'create' | 'edit' | 'list';
  totalPages?: number;
  pageNumber?: number;
  pageSize?: number;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
  isFetching?: boolean;
}
const TaskListTable = (props: TaskListTableProps) => {
  const {
    data,
    displayType,
    type,
    totalPages,
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    isFetching,
    isLoading,
  } = props;

  const columnHelper = createColumnHelper<taskFormDetails>();
  const columns = useMemo(
    () => {
      const baseColumns = [
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
        columnHelper.accessor('priorityName', {
          cell: (info) => {
            return (
              <GenericStatusBox
                colorCode={info.row.original.statusColorCode}
                text={info.getValue() as string}
              />
            );
          },
          header: 'Priority',
          enableSorting: false,
        }),
        columnHelper.accessor('estimatedDurationInHours', {
          cell: (info) => {
            const value = info.getValue();
            return value !== null
              ? `${value} hour${value > 1 ? 's' : ''}`
              : 'N/A';
          },
          header: 'Estimated Duration',
          enableSorting: false,
        }),
        columnHelper.accessor('costEstimate', {
          cell: (info) => amountFormatter(info.getValue() ?? 0),
          header: 'Estimate Cost',
          enableSorting: false,
        }),
        columnHelper.accessor('assignedToEmployeeName', {
          cell: (info) => <AssignedTo name={info.getValue()} />,
          header: 'Assigned To',
          enableSorting: false,
        }),
        columnHelper.accessor('status', {
          cell: (info) => {
            return (
              <GenericStatusBox
                colorCode={info.row.original.statusColorCode}
                text={info.getValue() as string}
              />
            );
          },
          header: 'Status',
          enableSorting: false,
        }),
      ];
      const popOverColumn = columnHelper.accessor('taskType', {
        cell: (info) => PopoverAction(info.row.original),
        header: '',
        enableSorting: false,
      });

      if (displayType === 'form') {
        baseColumns.push(popOverColumn);
      }
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <DataTable
      columns={columns}
      data={data}
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
      totalPages={totalPages}
      pageNumber={pageNumber}
      pageSize={pageSize}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      isFetching={isFetching}
      isLoading={isLoading}
      showFooter={type === 'edit'}
      maxTdWidth="200px"
    />
  );
};

export default TaskListTable;

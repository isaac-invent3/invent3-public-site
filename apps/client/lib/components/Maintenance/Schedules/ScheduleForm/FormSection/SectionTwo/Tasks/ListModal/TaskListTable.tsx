import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import {
  MaintenanceColorCode,
  TaskPriorityColorCode,
} from '~/lib/utils/ColorCodes';
import PopoverAction from './PopoverAction';
import DataTable from '~/lib/components/UI/Table';
import AssignedTo from '~/lib/components/Common/AssignedTo';

interface TaskListTableProps {
  data: taskFormDetails[];
  type: 'form' | 'summary';
}
const TaskListTable = (props: TaskListTableProps) => {
  const { data, type } = props;

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
                colorCode={TaskPriorityColorCode[info.getValue() as 'High']}
                text={info.getValue() as string}
              />
            );
          },
          header: 'Priority',
          enableSorting: false,
        }),
        columnHelper.accessor('dueDate', {
          cell: (info) => info.getValue(),
          header: 'Due Date',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCompleted', {
          cell: (info) => info.getValue(),
          header: 'Completion Date',
          enableSorting: false,
        }),
        columnHelper.accessor('assignedToEmployeeName', {
          cell: (info) => AssignedTo(info.getValue()),
          header: 'Assigned To',
          enableSorting: false,
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
      ];
      const popOverColumn = columnHelper.accessor('taskType', {
        cell: (info) => PopoverAction(info.row.original),
        header: '',
        enableSorting: false,
      });

      if (type === 'form') {
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
      showFooter={false}
      maxTdWidth="200px"
    />
  );
};

export default TaskListTable;

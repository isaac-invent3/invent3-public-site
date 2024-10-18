import { createColumnHelper } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import DataTable from '~/lib/components/UI/Table';
import { Task } from '~/lib/interfaces/task.interfaces';
import {
  MaintenanceColorCode,
  TaskPriorityColorCode,
} from '~/lib/utils/ColorCodes';
import PopoverAction from './PopoverAction';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import { dateFormatter } from '~/lib/utils/Formatters';
import AssignedTo from '~/lib/components/Common/AssignedTo';

interface TaskTableProps {
  scheduleId: number;
  showPopover: boolean;
}
const TaskTable = (props: TaskTableProps) => {
  const { scheduleId, showPopover } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery({
    id: scheduleId,
  });

  const columnHelper = createColumnHelper<Task>();
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
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
          header: 'Due Date',
          enableSorting: false,
        }),
        columnHelper.accessor('dateCompleted', {
          cell: (info) => {
            const value = info.getValue();
            if (value && !isNaN(new Date(value).getTime())) {
              return dateFormatter(value, 'DD / MM / YYYY');
            } else {
              return 'N/A';
            }
          },
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

      if (showPopover) {
        baseColumns.push(popOverColumn);
      }
      return baseColumns;
    },
    [[data?.data?.items]] //eslint-disable-line
  );

  return (
    <DataTable
      columns={columns}
      data={data?.data?.items ?? []}
      isLoading={isLoading}
      isFetching={isFetching}
      totalPages={data?.data?.totalPages}
      setPageNumber={setCurrentPage}
      pageNumber={currentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
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
      showFooter={true}
      maxTdWidth="200px"
    />
  );
};

export default TaskTable;

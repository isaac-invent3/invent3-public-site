import { Avatar, HStack, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import TaskListModal from '~/lib/components/TaskManagement/Modals/TaskListModal';
import GenericStatusBox from '~/lib/components/UI/GenericStatusBox';
import DataTable from '~/lib/components/UI/Table';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import {
  MaintenanceColorCode,
  TaskPriorityColorCode,
} from '~/lib/utils/ColorCodes';
import PopoverAction from './PopoverAction';

const AssignedTo = (task: taskFormDetails) => {
  return (
    <HStack spacing="8px">
      <Avatar width="30px" height="30px" />
      <Text color="black">{task.assignedToName}</Text>
    </HStack>
  );
};
interface TaskListTableProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask: (task: taskFormDetails) => void;
}
const TaskListTable = (props: TaskListTableProps) => {
  const { isOpen, onClose, handleAddTask } = props;
  const columnHelper = createColumnHelper<taskFormDetails>();
  const { values } = useFormikContext<any>();
  const data = values.tasks;

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
        columnHelper.accessor('assignedTo', {
          cell: (info) => AssignedTo(info.row.original),
          header: 'Assigned To',
          enableSorting: false,
        }),
        columnHelper.accessor('taskStatusName', {
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

        columnHelper.accessor('taskName', {
          cell: (info) => PopoverAction(info.row.original),
          header: '',
          enableSorting: false,
        }),
      ];
      return baseColumns;
    },
    [[data]] //eslint-disable-line
  );

  return (
    <TaskListModal
      isOpen={isOpen}
      onClose={onClose}
      isDefaultPlan={false}
      handleAddTask={handleAddTask}
    >
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
      />
    </TaskListModal>
  );
};

export default TaskListTable;

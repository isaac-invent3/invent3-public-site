import React from 'react';
import TaskListModal from '~/lib/components/TaskManagement/Modals/TaskListModal';
import TaskTable from './TaskTable';

interface TaskListViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: number;
  showPopover: boolean;
}
const TaskListView = (props: TaskListViewProps) => {
  const { isOpen, onClose, scheduleId, showPopover } = props;

  return (
    <TaskListModal
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={showPopover}
      scheduleId={scheduleId}
    >
      <TaskTable scheduleId={scheduleId} showPopover={showPopover} />
    </TaskListModal>
  );
};

export default TaskListView;

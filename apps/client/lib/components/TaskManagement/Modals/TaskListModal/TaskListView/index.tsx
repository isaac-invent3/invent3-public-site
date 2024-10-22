import React, { useState } from 'react';
import TaskListModal from '~/lib/components/TaskManagement/Modals/TaskListModal';
import TaskTable from '../../../TaskTable';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';

interface TaskListViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: number;
  showPopover: boolean;
}
const TaskListView = (props: TaskListViewProps) => {
  const { isOpen, onClose, scheduleId, showPopover } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery({
    id: scheduleId,
    pageSize,
    pageNumber: currentPage,
  });

  return (
    <TaskListModal
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={showPopover}
      scheduleId={scheduleId}
    >
      <TaskTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={false}
        type="modal"
      />
    </TaskListModal>
  );
};

export default TaskListView;

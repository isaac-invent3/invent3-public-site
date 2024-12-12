import React, { useState } from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import { DEFAULT_PAGE_SIZE } from '~/lib/utils/constants';
import { useGetAllTaskInstancesByScheduleInstanceIdQuery } from '~/lib/redux/services/task/instance.services';
import TaskInstanceTable from '../../Tables/TaskInstanceTable';

interface TaskInstanceListViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: number;
  showPopover: boolean;
}
const TaskInstanceListView = (props: TaskInstanceListViewProps) => {
  const { isOpen, onClose, scheduleId, showPopover } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAllTaskInstancesByScheduleInstanceIdQuery({
      id: scheduleId,
      pageSize,
      pageNumber: currentPage,
    });

  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={showPopover}
      scheduleId={scheduleId}
      taskType="instance"
    >
      <TaskInstanceTable
        data={data?.data?.items ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        totalPages={data?.data?.totalPages}
        setPageNumber={setCurrentPage}
        pageNumber={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isSortable={false}
        type="drawer"
      />
    </TaskListDrawer>
  );
};

export default TaskInstanceListView;

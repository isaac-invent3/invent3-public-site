import React, { useState } from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { useGetAllTaskInstancesByScheduleInstanceIdQuery } from '~/lib/redux/services/task/instance.services';
import TaskInstanceTable from '../../Tables/TaskInstanceTable';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';

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

  const { removeSearchParam } = useCustomSearchParams();

  const handleClose = () => {
    removeSearchParam(
      SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULE_INSTANCE.slug
    );
    onClose();
  };

  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={handleClose}
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

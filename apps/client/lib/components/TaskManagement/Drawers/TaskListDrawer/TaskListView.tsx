import React, { useState } from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';
import TaskTable from '../../Tables/TaskTable';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import { Spinner, VStack } from '@chakra-ui/react';
import GenericErrorState from '~/lib/components/UI/GenericErrorState';

interface TaskListViewProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleId: number;
  showPopover: boolean;
}
const TaskListView = (props: TaskListViewProps) => {
  const { isOpen, onClose, scheduleId, showPopover } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { getSearchParam, removeSearchParam } = useCustomSearchParams();
  const maintenanceScheduleId = getSearchParam('maintenanceScheduleId');
  const { data, isLoading, isFetching, isError } =
    useGetAllTasksByScheduleIdQuery({
      id: scheduleId ?? maintenanceScheduleId,
      pageSize,
      pageNumber: currentPage,
    });

  const handleClose = () => {
    removeSearchParam(SYSTEM_CONTEXT_DETAILS.MAINTENANCE_SCHEDULES.slug);
    onClose();
  };

  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={handleClose}
      showAddTaskButton={showPopover && data?.data !== undefined}
      scheduleId={scheduleId}
      taskType="main"
    >
      {isLoading ? (
        <VStack width="full" height="full" justifyContent="center">
          <Spinner
            thickness="4px"
            size="lg"
            color="primary.500"
            emptyColor="gray.200"
          />
        </VStack>
      ) : data?.data ? (
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
          type="drawer"
        />
      ) : (
        isError && <GenericErrorState subtitle="Invalid Schedule" />
      )}
    </TaskListDrawer>
  );
};

export default TaskListView;

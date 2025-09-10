import { useState } from 'react';
import {
  taskInstanceApi,
  useGetAllTaskInstancesQuery,
} from '~/lib/redux/services/task/instance.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  STATUS_CATEGORY_ENUM,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TabTableView from '.';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';

interface PendingAndInProgressTabProps {
  statusCategoryId: number;
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

const PendingAndInProgressTab = (props: PendingAndInProgressTabProps) => {
  const { statusCategoryId, search, openFilter, activeFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const { updateSearchParam } = useCustomSearchParams();
  const dispatch = useAppDispatch();
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );

  const { data, isLoading, isFetching } = useGetAllTaskInstancesQuery({
    pageSize,
    pageNumber: currentPage,
    statusCategoryId: statusCategoryId,
  });

  const searchCriterion = {
    columnName: 'statusCategoryId',
    columnValue: statusCategoryId,
    operation: OPERATORS.Equals,
  };

  // SignalR Connection
  const connectionState = useSignalR('tasks-hub');

  useSignalREventHandler({
    eventName: 'ReceiveTask',
    connectionState,
    callback: (newTask) => {
      // Update the query cache when a new task is received
      const parsedTask = JSON.parse(newTask);
      if (parsedTask.statusCategoryId !== STATUS_CATEGORY_ENUM.INACTIVE) {
        dispatch(
          taskInstanceApi.util.updateQueryData(
            'getAllTaskInstances',
            {
              pageNumber: currentPage,
              pageSize,
              statusCategoryId: statusCategoryId,
            },
            (draft) => {
              if (draft?.data?.items) {
                draft?.data?.items.unshift(parsedTask); // Add new task to the beginning
              }
            }
          )
        );
      }
    },
  });
  useSignalREventHandler({
    eventName: 'UpdateTask',
    connectionState,
    callback: (newTask) => {
      // Update the query cache when a new task is received
      const parsedTask = JSON.parse(newTask);
      dispatch(
        taskInstanceApi.util.updateQueryData(
          'getAllTaskInstances',
          {
            pageNumber: currentPage,
            pageSize,
            statusCategoryId: statusCategoryId,
          },
          (draft) => {
            if (draft?.data?.items) {
              if (
                (parsedTask.statusCategoryId ===
                  STATUS_CATEGORY_ENUM.INACTIVE &&
                  parsedTask.taskStatusId === STATUS_CATEGORY_ENUM.ACTIVE) ||
                (parsedTask.statusCategoryId === STATUS_CATEGORY_ENUM.ACTIVE &&
                  parsedTask.taskStatusId ===
                    +(appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID ?? '0'))
              ) {
                draft.data.items = draft.data.items.filter(
                  (task) => task.taskInstanceId !== parsedTask.taskInstanceId
                ); // Remove the task from pending tab if the status has changed to in-progress or remove from in progress if the status has changed to completed
              } else {
                const index = draft.data.items.findIndex(
                  (task) => task.taskInstanceId === parsedTask.taskInstanceId
                );
                if (index !== -1) {
                  draft.data.items[index] = parsedTask; // Update the existing task
                }
              }
            }
          }
        )
      );
    },
  });
  useSignalREventHandler({
    eventName: 'DeleteTask',
    connectionState,
    callback: (newTask) => {
      // Update the query cache when a new task is received
      const parsedTask = JSON.parse(newTask);
      dispatch(
        taskInstanceApi.util.updateQueryData(
          'getAllTaskInstances',
          {
            pageNumber: currentPage,
            pageSize,
            statusCategoryId: statusCategoryId,
          },

          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (task) => task.taskInstanceId !== parsedTask.taskInstanceId
              ); // Remove the deleted task
            }
          }
        )
      );
    },
  });

  return (
    <TabTableView
      search={search}
      openFilter={openFilter}
      activeFilter={activeFilter}
      isLoading={isLoading}
      isFetching={isFetching}
      pageSize={pageSize}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setPageSize={setPageSize}
      data={data?.data}
      isCompleted={false}
      specificSearchCriterion={searchCriterion}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      handleSelectRow={(row) =>
        updateSearchParam(
          SYSTEM_CONTEXT_DETAILS.TASKS.slug,
          row?.taskInstanceId
        )
      }
    />
  );
};

export default PendingAndInProgressTab;

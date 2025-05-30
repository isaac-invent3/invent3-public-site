import { useState } from 'react';
import {
  taskInstanceApi,
  useGetAllCompletedTaskInstancesQuery,
} from '~/lib/redux/services/task/instance.services';
import {
  DEFAULT_PAGE_SIZE,
  OPERATORS,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import TabTableView from '.';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';

interface CompletedTabProps {
  search: string;
  openFilter: boolean;
  activeFilter: 'bulk' | 'general' | null;
}

const CompletedTab = (props: CompletedTabProps) => {
  const { search, openFilter, activeFilter } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { updateSearchParam } = useCustomSearchParams();
  const { data, isLoading, isFetching } = useGetAllCompletedTaskInstancesQuery({
    pageSize,
    pageNumber: currentPage,
  });
  const dispatch = useAppDispatch();
  const appConfigValue = useAppSelector(
    (state) => state.general.appConfigValues
  );
  const appConfig = useAppSelector((state) => state.general.appConfigValues);

  const searchCriterion = {
    columnName: 'statusCategoryId',
    columnValue:
      typeof appConfig.DEFAULT_COMPLETED_TASK_STATUS_ID === 'string'
        ? +appConfig.DEFAULT_COMPLETED_TASK_STATUS_ID
        : (appConfig.DEFAULT_COMPLETED_TASK_STATUS_ID as unknown as number),
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
      if (
        +(appConfigValue?.DEFAULT_COMPLETED_TASK_STATUS_ID ?? '0') ===
        parsedTask.statusCategoryId
      ) {
        dispatch(
          taskInstanceApi.util.updateQueryData(
            'getAllTaskInstances',
            {
              pageNumber: currentPage,
              pageSize,
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
      specificSearchCriterion={searchCriterion}
      handleSelectRow={(row) =>
        updateSearchParam(
          SYSTEM_CONTEXT_DETAILS.TASKS.slug,
          row?.taskInstanceId
        )
      }
    />
  );
};

export default CompletedTab;

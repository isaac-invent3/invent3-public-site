import { useCallback, useEffect, useState } from 'react';
import GenericTemplateModal from '~/lib/components/Common/Modals/GenericTemplateModal';
import TaskInstanceTable from '../../TaskManagement/Tables/TaskInstanceTable';
import {
  taskInstanceApi,
  useGetAllTaskInstancesQuery,
  useSearchTaskInstancesMutation,
} from '~/lib/redux/services/task/instance.services';
import {
  DEFAULT_PAGE_SIZE,
  SYSTEM_CONTEXT_DETAILS,
} from '~/lib/utils/constants';
import { TaskInstance } from '~/lib/interfaces/task.interfaces';
import { BaseApiResponse, ListResponse } from '@repo/interfaces';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { OPERATORS } from '@repo/constants';
import { useDisclosure } from '@chakra-ui/react';
import useCustomSearchParams from '~/lib/hooks/useCustomSearchParams';
import TaskDetailDrawer from '../../TaskManagement/Drawers/TaskDetailDrawer';
import useSignalR from '~/lib/hooks/useSignalR';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import { useAppDispatch } from '~/lib/redux/hooks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const TaskModal = (props: TaskModalProps) => {
  const { isOpen, onClose } = props;
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } = useGetAllTaskInstancesQuery({
    pageNumber,
    pageSize,
  });
  const [searchData, setSearchData] = useState<
    BaseApiResponse<ListResponse<TaskInstance>> | undefined
  >(undefined);
  const { handleSubmit } = useCustomMutation();
  const [searchTask, { isLoading: searchLoading }] =
    useSearchTaskInstancesMutation({});
  const { getSearchParam, clearSearchParamsAfter, updateSearchParam } =
    useCustomSearchParams();
  const taskInstanceId = getSearchParam(SYSTEM_CONTEXT_DETAILS.TASKS.slug);
  const {
    isOpen: isOpenTask,
    onClose: onCloseTask,
    onOpen: onOpenTask,
  } = useDisclosure();
  const dispatch = useAppDispatch();

  const searchCriterion = {
    ...(search && {
      criterion: [
        {
          columnName: 'taskInstanceName',
          columnValue: search,
          operation: OPERATORS.Contains,
        },
      ],
    }),
    pageNumber,
    pageSize,
  };

  // Function that handles search/filters
  const handleSearch = useCallback(async () => {
    if (search) {
      const response = await handleSubmit(searchTask, searchCriterion, '');
      response?.data?.data && setSearchData(response?.data);
    }
  }, [searchTask, searchCriterion]);

  // Trigger search when search input changes or pagination updates
  useEffect(() => {
    if (search) {
      handleSearch();
    }
  }, [search, pageNumber, pageSize]);

  // Reset pagination when the search input is cleared or apply filter flag is false
  useEffect(() => {
    if (!search) {
      setPageSize(DEFAULT_PAGE_SIZE);
      setPageNumber(1);
    }
  }, [search]);

  //Open Task detail drawer if task id exists
  useEffect(() => {
    if (taskInstanceId !== undefined) {
      onOpenTask();
    }
  }, [taskInstanceId]);

  // SignalR Connection
  const connectionState = useSignalR('tasks-hub');

  useSignalREventHandler({
    eventName: 'CreateTask',
    connectionState,
    callback: (newTask) => {
      // Update the query cache when a new task is received
      const parsedTask = JSON.parse(newTask);
      dispatch(
        taskInstanceApi.util.updateQueryData(
          'getAllTaskInstances',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft?.data?.items.unshift(parsedTask); // Add new task to the beginning
            }
          }
        )
      );
    },
  });

  useSignalREventHandler({
    eventName: 'UpdateTask',
    connectionState,
    callback: (updatedTask) => {
      // Update the query cache when a task is updated
      const parsedTask = JSON.parse(updatedTask);
      dispatch(
        taskInstanceApi.util.updateQueryData(
          'getAllTaskInstances',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              const index = draft.data.items.findIndex(
                (item) => item.taskInstanceId === parsedTask.taskInstanceId
              );
              if (index !== -1) {
                draft.data.items[index] = parsedTask;
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
    callback: (deletedTask) => {
      // Update the query cache when a task is deleted
      const parsedTask = JSON.parse(deletedTask);
      dispatch(
        taskInstanceApi.util.updateQueryData(
          'getAllTaskInstances',
          {
            pageNumber,
            pageSize,
          },
          (draft) => {
            if (draft?.data?.items) {
              draft.data.items = draft.data.items.filter(
                (item) => item.taskInstanceId !== parsedTask.taskInstanceId
              ); // Remove the deleted task
            }
          }
        )
      );
    },
  });

  return (
    <>
      <GenericTemplateModal
        isOpen={isOpen}
        onClose={onClose}
        headerName={'Tasks'}
        pageSize={pageSize}
        pageNumber={pageNumber}
        totalPages={
          search && searchData
            ? searchData.data?.totalPages
            : (data?.data?.totalPages ?? 0)
        }
        setSearch={setSearch}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        // filters={Filter}
      >
        <TaskInstanceTable
          data={
            search && searchData
              ? searchData.data?.items
              : (data?.data?.items ?? [])
          }
          isLoading={isLoading}
          isFetching={isFetching || searchLoading}
          isSelectable={false}
          emptyLines={4}
          type="page"
          showFooter={false}
          handleSelectRow={(row) =>
            updateSearchParam(
              SYSTEM_CONTEXT_DETAILS.TASKS.slug,
              row?.taskInstanceId
            )
          }
        />
      </GenericTemplateModal>
      {taskInstanceId && (
        <TaskDetailDrawer
          isOpen={isOpenTask}
          onClose={() => {
            clearSearchParamsAfter(SYSTEM_CONTEXT_DETAILS.TASKS.slug, {
              removeSelf: true,
            });
            onCloseTask();
          }}
          data={undefined}
        />
      )}
    </>
  );
};

export default TaskModal;

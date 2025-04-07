import { HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '@repo/ui/components';
import CardHeader from '../../Common/CardHeader';
import TaskInstanceTable from '~/lib/components/TaskManagement/Tables/TaskInstanceTable';
import {
  taskInstanceApi,
  useGetAllTaskInstancesQuery,
} from '~/lib/redux/services/task/instance.services';
import TaskModal from '../../Modals/TaskModal';
import useSignalREventHandler from '~/lib/hooks/useSignalREventHandler';
import useSignalR from '~/lib/hooks/useSignalR';
import { useAppDispatch } from '~/lib/redux/hooks';

const Tasks = () => {
  const { data, isLoading, isFetching } = useGetAllTaskInstancesQuery({
    pageNumber: 1,
    pageSize: 5,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

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
            pageNumber: 1,
            pageSize: 5,
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
            pageNumber: 1,
            pageSize: 5,
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
            pageNumber: 1,
            pageSize: 5,
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
      <VStack
        width="full"
        height="full"
        pl="16px"
        pr="15px"
        pt="21px"
        pb="12px"
        alignItems="flex-start"
        spacing="16px"
        bgColor="white"
        rounded="8px"
      >
        <HStack width="full" justifyContent="space-between">
          <HStack width="full" alignItems="center">
            <CardHeader>Tasks</CardHeader>
            <Text
              color="neutral.800"
              py="6px"
              px="8px"
              rounded="4px"
              bgColor="neutral.200"
            >
              Today
            </Text>
          </HStack>
          <Button
            handleClick={onOpen}
            customStyles={{
              py: 0,
              height: '28px',
              width: '68px',
              fontSize: '12px',
              lineHeight: '14.26px',
            }}
          >
            View All
          </Button>
        </HStack>
        <TaskInstanceTable
          data={data?.data?.items ?? []}
          isLoading={isLoading}
          isFetching={isFetching}
          isSelectable={false}
          emptyLines={4}
          type="page"
          showFooter={false}
        />
      </VStack>
      {isOpen && <TaskModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Tasks;

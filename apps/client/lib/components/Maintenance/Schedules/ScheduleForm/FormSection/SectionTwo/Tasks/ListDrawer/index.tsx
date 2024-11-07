import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import TaskListTable from './TaskListTable';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { useGetAllTasksByScheduleIdQuery } from '~/lib/redux/services/task/general.services';

interface FormTaskListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask: (task: taskFormDetails) => void;
}
const FormTaskListDrawer = (props: FormTaskListDrawerProps) => {
  const { isOpen, onClose, handleAddTask } = props;
  const { values, setFieldValue } = useFormikContext<ScheduleFormDetails>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data, isLoading, isFetching } = useGetAllTasksByScheduleIdQuery(
    { id: values.scheduleId, pageNumber, pageSize },
    { skip: !values.scheduleId }
  );

  useEffect(() => {
    console.log({ scheduleId: values.scheduleId });
    if (data?.data) {
      if (data?.data?.items?.length >= 1) {
        const tasks: Task[] = data?.data?.items;
        const formattedTasks: taskFormDetails[] = [];
        tasks.forEach((item, index) => {
          formattedTasks.push({
            assetId: item.assetId,
            assetLocation: item.assetLocation,
            assetName: '',
            scheduleId: item.scheduleId,
            taskId: item.taskId,
            taskTypeId: item.taskTypeId,
            taskType: item.taskType,
            taskName: item.taskName,
            taskDescription: item.taskDescription ?? undefined,
            priorityId: item.taskPriorityId,
            priorityName: item.priorityName,
            statusId: item.statusId,
            status: item.status,
            assignedTo: item.assignedTo,
            assignedToEmployeeName: item.assignedToEmployeeName,
            dateCompleted: item.dateCompleted,
            costEstimate: item.costEstimate,
            actualCost: item.actualCost,
            comments: item.comments,
            estimatedDurationInHours: 0,
            localId: index + 1,
          });
        });
        console.log({ tasks: [...values.tasks, ...formattedTasks] });
        setFieldValue('tasks', [...values.tasks, ...formattedTasks]);
      }
    }
  }, [data]);
  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={true}
      handleAddTask={handleAddTask}
    >
      <TaskListTable
        data={values.tasks}
        displayType="form"
        type={values.scheduleId ? 'edit' : 'create'}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        isFetching={isFetching}
        isLoading={isLoading}
        totalPages={data?.data?.totalPages}
      />
    </TaskListDrawer>
  );
};

export default FormTaskListDrawer;

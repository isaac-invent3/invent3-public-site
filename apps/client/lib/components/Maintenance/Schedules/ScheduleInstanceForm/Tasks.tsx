import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScheduleFormDetails } from '~/lib/interfaces/maintenance.interfaces';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useGetAllTaskInstancesByScheduleInstanceIdQuery } from '~/lib/redux/services/task/instance.services';
import { DEFAULT_PAGE_SIZE, STATUS_CATEGORY_ENUM } from '~/lib/utils/constants';
import TaskListTable from '../ScheduleForm/FormSection/SectionTwo/Tasks/ListDrawer/TaskListTable';

const Tasks = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { values, setFieldValue } = useFormikContext<ScheduleFormDetails>();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading, isFetching } =
    useGetAllTaskInstancesByScheduleInstanceIdQuery(
      {
        id: values.scheduleId!,
        pageNumber,
        pageSize,
        statusCategoryId: STATUS_CATEGORY_ENUM.INACTIVE,
      },
      { skip: !values.scheduleId }
    );

  useEffect(() => {
    if (data?.data) {
      if (data?.data?.items?.length >= 1) {
        const tasks = data?.data?.items;
        const formattedTasks: taskFormDetails[] = [];
        tasks.forEach((item, index) => {
          formattedTasks.push({
            assetId: item?.assetId,
            assetLocation: item?.assetLocation,
            assetName: '',
            scheduleId: item?.scheduleInstanceId,
            taskId: item?.taskInstanceId,
            taskTypeId: item?.taskTypeId,
            taskType: item?.taskType,
            taskName: item?.taskInstanceName,
            taskDescription: item?.taskDescription!,
            priorityId: item?.taskPriorityId,
            priorityName: item?.priorityName,
            statusId: item?.currentStatusId,
            status: item?.currentStatus,
            priorityColorCode: item?.priorityColorCode,
            statusColorCode: item?.statusColorCode,
            assignedTo: item?.assignedToEmployeeId,
            assignedToEmployeeName: item?.assignedToEmployeeName,
            dateCompleted: item?.dateCompleted,
            costEstimate: item?.costEstimate,
            actualCost: item?.actualCost,
            comments: item?.comments,
            estimatedDurationInHours: item?.estimatedDurationInHours,
            document: item?.document ?? null,
            localId: index + 1,
          });
        });
        setFieldValue('tasks', [...values.tasks, ...formattedTasks]);
      }
    }
  }, [data]);
  return (
    <TaskListTable
      data={values.tasks}
      displayType="form"
      type="edit"
      pageNumber={pageNumber}
      pageSize={pageSize}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      isFetching={isFetching}
      isLoading={isLoading}
      totalPages={data?.data?.totalPages}
    />
  );
};

export default Tasks;

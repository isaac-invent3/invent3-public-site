'use client';

import { notFound } from 'next/navigation';
import TaskForm from '~/lib/components/TaskManagement/TaskForm';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';

import { Task } from '~/lib/interfaces/task.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';
import { useGetTaskByIdQuery } from '~/lib/redux/services/task/general.services';
import { setTaskForm } from '~/lib/redux/slices/TaskSlice';
import { dateFormatter } from '~/lib/utils/Formatters';

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading } = useGetTaskByIdQuery(params.id!);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }
  if (!data?.data) return notFound();

  if (data?.data) {
    const taskData = data?.data;
    const task: Task = taskData?.taskInfoHeader;
    dispatch(
      setTaskForm({
        assetId: task?.assetId,
        assetName: '',
        assetLocation: task?.assetLocation,
        scheduleId: task?.scheduleId ?? null,
        taskId: task?.taskId ?? null,
        taskTypeId: task?.taskTypeId ?? null,
        taskType: task?.taskType ?? null,
        taskName: task?.taskName ?? null,
        taskDescription: task?.taskDescription ?? undefined,
        priorityId: task?.taskPriorityId ?? null,
        priorityName: task?.priorityName ?? null,
        statusId: task?.statusId ?? null,
        status: task?.status ?? null,
        priorityColorCode: task?.priorityColorCode ?? null,
        statusColorCode: task?.statusColorCode ?? null,
        assignedTo: task?.assignedTo ?? null,
        assignedToEmployeeName: task?.assignedToEmployeeName ?? null,
        estimatedDurationInHours: task?.estimatedDurationInHours ?? null,
        dateCompleted: task?.dateCompleted
          ? dateFormatter(task?.dateCompleted, 'DD/MM/YYYY')
          : null,
        costEstimate: task?.costEstimate ?? null,
        actualCost: task?.actualCost ?? null,
        comments: task?.comments ?? null,
        localId: task?.taskId,
        document: task?.document ?? null,
      })
    );
  }

  return <TaskForm type="edit" />;
}

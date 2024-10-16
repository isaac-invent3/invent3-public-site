interface taskFormDetails {
  taskId: number | null;
  taskTypeId: number | null;
  taskTypeName: string | null;
  taskName: string | null;
  taskDescription: string | null;
  taskStatusId: number | null;
  taskStatusName: string | null;
  priorityId: number | null;
  priorityName: string | null;
  assignedTo: number | null;
  assignedToName: string | null;
  dueDate: string | null;
  dateCompleted: string | null;
  costEstimate: number | null;
  actualCost: number | null;
  comments: string | null;
}

export type { taskFormDetails };

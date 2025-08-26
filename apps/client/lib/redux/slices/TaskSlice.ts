import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';

export interface SliceProps {
  taskForm: taskFormDetails;
}

const initialTaskForm = {
  assetId: null,
  assetName: null,
  assetLocation: null,
  taskTypeId: null,
  taskName: null,
  taskDescription: null,
  priorityId: null,
  assignedTo: null,
  estimatedDurationInHours: null,
  dateCompleted: null,
  costEstimate: null,
  actualCost: null,
  comments: null,
  scheduleId: null,
  taskId: null,
  taskType: null,
  statusId: null,
  status: null,
  priorityName: null,
  priorityColorCode: null,
  statusColorCode: null,
  assignedToEmployeeName: null,
  document: null,
  localId: null,
};

const initialState: SliceProps = {
  taskForm: initialTaskForm,
};

export const Task = createSlice({
  name: 'taskReducer',
  initialState,
  reducers: {
    setTaskForm: (state, { payload }: PayloadAction<taskFormDetails>) => {
      state.taskForm = payload;
    },
    updateTaskForm: (
      state,
      { payload }: PayloadAction<Partial<taskFormDetails>>
    ) => {
      state.taskForm = { ...state.taskForm, ...payload };
    },
    clearTaskForm: (state) => {
      state.taskForm = initialTaskForm;
    },
  },
});

export const { setTaskForm, updateTaskForm, clearTaskForm } = Task.actions;

export default Task.reducer;

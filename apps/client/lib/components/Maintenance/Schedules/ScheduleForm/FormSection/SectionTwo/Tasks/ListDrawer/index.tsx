import { useFormikContext } from 'formik';
import React from 'react';
import TaskListDrawer from '~/lib/components/TaskManagement/Drawers/TaskListDrawer';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import TaskListTable from './TaskListTable';

interface FormTaskListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask: (task: taskFormDetails) => void;
}
const FormTaskListDrawer = (props: FormTaskListDrawerProps) => {
  const { isOpen, onClose, handleAddTask } = props;
  const { values } = useFormikContext<any>();
  const data = values.tasks;

  return (
    <TaskListDrawer
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={true}
      handleAddTask={handleAddTask}
    >
      <TaskListTable data={data} type="form" />
    </TaskListDrawer>
  );
};

export default FormTaskListDrawer;

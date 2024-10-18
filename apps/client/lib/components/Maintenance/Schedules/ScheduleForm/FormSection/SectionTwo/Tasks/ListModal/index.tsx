import { useFormikContext } from 'formik';
import React from 'react';
import TaskListModal from '~/lib/components/TaskManagement/Modals/TaskListModal';
import { taskFormDetails } from '~/lib/interfaces/task.interfaces';
import TaskListTable from './TaskListTable';

interface FormTaskListModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleAddTask: (task: taskFormDetails) => void;
}
const FormTaskListModal = (props: FormTaskListModalProps) => {
  const { isOpen, onClose, handleAddTask } = props;
  const { values } = useFormikContext<any>();
  const data = values.tasks;

  return (
    <TaskListModal
      isOpen={isOpen}
      onClose={onClose}
      showAddTaskButton={true}
      handleAddTask={handleAddTask}
    >
      <TaskListTable data={data} type="form" />
    </TaskListModal>
  );
};

export default FormTaskListModal;

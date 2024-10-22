import type { Metadata } from 'next';
import TaskForm from '~/lib/components/TaskManagement/TaskForm';

export const metadata: Metadata = {
  title: 'Task Management',
};

export default function Page() {
  return <TaskForm type="create" />;
}

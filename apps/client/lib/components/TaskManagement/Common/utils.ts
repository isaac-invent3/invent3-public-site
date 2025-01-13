const saveSelectedTaskIds = (selectedTaskIds: number[]) => {
  localStorage.setItem('taskIds', JSON.stringify(selectedTaskIds));
};

const getSelectedTaskIds = (): number[] => {
  const savedTasks = localStorage.getItem('taskIds');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const removeSelectedTaskIds = () => {
  localStorage.removeItem('taskIds');
};
export { saveSelectedTaskIds, getSelectedTaskIds, removeSelectedTaskIds };

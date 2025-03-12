const saveSelectedTicketIds = (selectedTicketIds: number[]) => {
  localStorage.setItem('ticketIds', JSON.stringify(selectedTicketIds));
};

const getSelectedTicketIds = (): number[] => {
  const savedTickets = localStorage.getItem('ticketIds');
  return savedTickets ? JSON.parse(savedTickets) : [];
};

const removeSelectedTicketIds = () => {
  localStorage.removeItem('ticketIds');
};
export { saveSelectedTicketIds, getSelectedTicketIds, removeSelectedTicketIds };

import { SelectedTicketAction } from '~/lib/interfaces/ticket.interfaces';
import { useAppDispatch, useAppSelector } from '~/lib/redux/hooks';
import { removeSelectedAction } from '~/lib/redux/slices/TicketSlice';
import AssignTicketDrawer from './Drawers/AssignTicketDrawer';
import EditTicketDrawer from './Drawers/EditTicketDrawer';
import ScheduleTicketDrawer from './Drawers/ScheduleTicketDrawer';
import TicketDrawerWrapper from './Drawers/TicketDrawerWrapper';
import DeleteTicketSuccessModal from './Modals/DeleteTicketModal';
import MarkTicketAsCompletedModal from './Modals/MarkTicketAsCompletedModal';

const TicketOverlays = () => {
  const { selectedTicket } = useAppSelector((state) => state.ticket);

  const dispatch = useAppDispatch();

  const closeModal = (action: SelectedTicketAction) => {
    dispatch(removeSelectedAction(action));
  };

  if (!selectedTicket) return;

  const { action, category, data } = selectedTicket;

  return (
    <div>
      {action.includes('schedule') && (
        <ScheduleTicketDrawer
          isOpen={action.includes('schedule')}
          onClose={() => closeModal('schedule')}
          category={category}
          data={data}
        />
      )}

      {action.includes('view') && (
        <TicketDrawerWrapper
          isOpen={action.includes('view')}
          onClose={() => closeModal('view')}
          data={data}
          category={category}
          action="view"
        />
      )}

      {action.includes('assign') && (
        <AssignTicketDrawer
          isOpen={action.includes('assign')}
          onClose={() => closeModal('assign')}
          data={data}
        />
      )}

      {action.includes('edit') && (
        <EditTicketDrawer
          isOpen={action.includes('edit')}
          onClose={() => closeModal('edit')}
          data={data}
        />
      )}

      {action.includes('delete') && (
        <DeleteTicketSuccessModal
          isOpen={action.includes('delete')}
          onClose={() => closeModal('delete')}
          data={data}
        />
      )}

      {action.includes('markAsCompleted') && (
        <MarkTicketAsCompletedModal
          isOpen={action.includes('markAsCompleted')}
          onClose={() => closeModal('markAsCompleted')}
          data={data}
        />
      )}
    </div>
  );
};

export default TicketOverlays;
